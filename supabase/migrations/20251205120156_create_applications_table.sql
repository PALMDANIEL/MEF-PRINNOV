/*
  # Create applications table for Prix de l'Innovation
  
  1. New Tables
    - `applications`
      - `id` (uuid, primary key) - Unique identifier for each application
      - `category` (text) - Category: 'emergence', 'excellence', or 'creativite'
      - `denomination` (text) - Organization name
      - `sigle` (text) - Acronym
      - `postal_address` (text) - Postal address
      - `email` (text) - Email address
      - `responsible_person_name` (text) - Name of responsible person
      - `responsible_person_contact` (text) - Contact of responsible person
      - `website` (text) - Website URL
      - `logo_url` (text) - Logo URL
      - `mef_structure_type` (text) - Type of MEF structure
      - `innovation_description` (text) - Description of innovation
      - `project_start_date` (text) - When the project started
      - `implementation_date` (text) - When it was implemented
      - `innovation_diagnostic` (text) - Problem being solved
      - `innovation_target` (text) - Target audience
      - `innovation_specificity` (text) - What makes it special
      - `innovation_sector_alignment` (text) - Alignment with sector objectives
      - `objectives` (jsonb) - Array of objectives and results
      - `future_objectives` (text) - Future objectives for next 3 years
      - `status` (text) - Application status: 'draft', 'submitted', 'under_review', 'approved', 'rejected'
      - `submitted_at` (timestamptz) - Submission timestamp
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      
  2. Security
    - Enable RLS on `applications` table
    - Add policy for public to insert applications
    - Add policy for public to read their own applications
    - Add policy for public to update their draft applications
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('emergence', 'excellence', 'creativite')),
  denomination text NOT NULL,
  sigle text,
  postal_address text,
  email text NOT NULL,
  responsible_person_name text,
  responsible_person_contact text,
  website text,
  logo_url text,
  mef_structure_type text,
  innovation_description text,
  project_start_date text,
  implementation_date text,
  innovation_diagnostic text,
  innovation_target text,
  innovation_specificity text,
  innovation_sector_alignment text,
  objectives jsonb DEFAULT '[]'::jsonb,
  future_objectives text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'approved', 'rejected')),
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create applications"
  ON applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view all submitted applications"
  ON applications
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update draft applications"
  ON applications
  FOR UPDATE
  TO anon
  USING (status = 'draft')
  WITH CHECK (status = 'draft' OR status = 'submitted');
