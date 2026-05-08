/*
  # Create subscribers table

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null) - subscriber email address
      - `source` (text, default 'free_pack') - how the subscriber signed up
      - `consent` (boolean, default true) - whether user consented to newsletter
      - `created_at` (timestamptz, default now()) - when they subscribed

  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for authenticated users to insert their own subscription
    - Add policy for anyone to insert (needed for unauthenticated free pack downloads)
    - No SELECT/UPDATE/DELETE for regular users to protect subscriber data

  3. Important Notes
    - The INSERT policy allows anonymous inserts so the free pack download
      form works without authentication. However, the email column has a
      UNIQUE constraint to prevent duplicate subscriptions.
    - No one can read, update, or delete subscriber data through the API.
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text DEFAULT 'free_pack',
  consent boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
