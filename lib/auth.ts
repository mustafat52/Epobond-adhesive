// Admin login: a signed, expiring cookie. Uses Web Crypto so it works in middleware and in route handlers.
export const COOKIE = "epobond_admin";
const enc = new TextEncoder();
const secret = () => process.env.ADMIN_SECRET || (process.env.NODE_ENV === "production" ? "" : "dev-only-secret-change-me");
async function hmac(msg: string) {
  if (!secret()) throw new Error("ADMIN_SECRET is not set.");
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
export async function makeToken() { const exp = Date.now() + 14 * 24 * 3600 * 1000; return `${exp}.${await hmac(String(exp))}`; }
export async function verifyToken(t?: string) {
  if (!t || !secret()) return false;
  const [exp, sig] = t.split("."); if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = await hmac(exp); return good.length === sig.length && good === sig;
}
// In production the password must come from the environment; the demo password only exists for local testing.
export const adminPassword = () => process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "epobond-admin");
