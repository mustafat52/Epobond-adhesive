# Admin panel setup (one time)

1. **Create the Supabase project** at supabase.com (free plan is fine).
2. **Create the table.** In Supabase open SQL Editor > New query, paste the contents of `supabase/schema.sql`, press Run.
3. **Copy your keys.** Project Settings > API: copy the Project URL and the `service_role` key.
4. **Create `.env.local`** in the project folder (copy `.env.example`) and fill in:
   - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from step 3
   - `ADMIN_PASSWORD`: the password the client will use to log in
   - `ADMIN_SECRET`: any long random text
5. **Install and load the products:**
   ```
   npm install
   npm run seed
   ```
   This puts the 52 starting products into Supabase.
6. **Run the site** with `npm run dev` and open http://localhost:3000/admin
7. **When you deploy** (for example on Vercel), add the same four values as environment variables there.

Keep the `service_role` key secret: never put it in a variable starting with `NEXT_PUBLIC_` and never commit `.env.local`.
