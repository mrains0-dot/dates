/*
  # Create Movies and Restaurants Tables

  1. New Tables
    - `movies`
      - `id` (uuid, primary key)
      - `title` (text)
      - `year` (text)
      - `genre` (text)
      - `category` (text - 'new_release' or 'classic')
      - `is_active` (boolean)
      - `week_number` (integer - for weekly rotation)
      - `created_at` (timestamp)
    
    - `restaurants`
      - `id` (uuid, primary key)
      - `name` (text)
      - `cuisine_type` (text)
      - `price_range` (text - 'budget' or 'upscale')
      - `location` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Policies allow public read access
    - Only service role can write

  3. Notes
    - Movies are refreshed weekly based on week_number
    - Restaurants include both budget and upscale options
*/

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  year text NOT NULL,
  genre text NOT NULL,
  category text NOT NULL CHECK (category IN ('new_release', 'classic')),
  is_active boolean DEFAULT true,
  week_number integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cuisine_type text NOT NULL,
  price_range text NOT NULL CHECK (price_range IN ('budget', 'upscale')),
  location text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active movies"
  ON movies FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public can view active restaurants"
  ON restaurants FOR SELECT
  TO public
  USING (is_active = true);
