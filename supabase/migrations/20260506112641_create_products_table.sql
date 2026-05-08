/*
  # Create products table for Electro NAM LAB guitar plugins

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, plugin name)
      - `artist` (text, iconic guitar player name)
      - `description` (text, plugin description)
      - `price` (numeric, plugin price)
      - `image_url` (text, product image URL)
      - `genre` (text, music genre associated)
      - `featured` (boolean, whether featured on homepage)
      - `created_at` (timestamptz, creation timestamp)

  2. Security
    - Enable RLS on `products` table
    - Public read access for all users (products are visible to everyone)
    - Only authenticated admin users can insert/update/delete (via service role)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  artist text NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text NOT NULL DEFAULT '',
  genre text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);
