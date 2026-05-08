/*
  # Fix RLS policies on products table

  1. Security Issue
    - The INSERT, UPDATE, and DELETE policies on `products` used `true` as
      the USING/WITH CHECK clause, allowing ANY authenticated user to
      perform unrestricted write operations. This effectively bypasses
      row-level security.

  2. Changes
    - DROP the three insecure policies:
      - "Authenticated users can insert products" (INSERT, WITH CHECK = true)
      - "Authenticated users can update products" (UPDATE, USING = true, WITH CHECK = true)
      - "Authenticated users can delete products" (DELETE, USING = true)
    - CREATE three new restrictive policies that check for admin role
      stored in `raw_app_meta_data`:
      - "Admins can insert products" (INSERT, WITH CHECK = admin check)
      - "Admins can update products" (UPDATE, USING = admin check, WITH CHECK = admin check)
      - "Admins can delete products" (DELETE, USING = admin check)
    - The SELECT policy ("Anyone can view products") remains unchanged
      as public read access is appropriate for a product catalog.

  3. Admin Check Logic
    - Uses `auth.jwt() -> 'app_metadata' ->> 'role'` to verify the user
      has an 'admin' role. App metadata cannot be modified by the user,
      making it secure for authorization decisions.

  4. Important Notes
    - No data is modified or deleted.
    - The SELECT policy for anon+authenticated users is preserved.
    - Until an admin user is created with `app_metadata.role = 'admin'`,
      no user will be able to insert, update, or delete products. This
      is the correct secure-by-default behavior.
*/

-- Drop insecure policies
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

-- Create restrictive policies that check for admin role in app_metadata
CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
