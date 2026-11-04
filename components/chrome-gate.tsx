"use client";
import { usePathname } from "next/navigation";
// The public header and footer are hidden inside /admin so the admin panel has its own clean layout.
export default function ChromeGate({ header, footer, children }: { header: React.ReactNode; footer: React.ReactNode; children: React.ReactNode }) {
  if (usePathname().startsWith("/admin")) return <>{children}</>;
  return <>{header}<main>{children}</main>{footer}</>;
}
