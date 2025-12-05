import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Application = {
  id?: string;
  category: 'emergence' | 'excellence' | 'creativite';
  denomination: string;
  sigle?: string;
  postal_address?: string;
  email: string;
  responsible_person_name?: string;
  responsible_person_contact?: string;
  website?: string;
  logo_url?: string;
  mef_structure_type?: string;
  innovation_description?: string;
  project_start_date?: string;
  implementation_date?: string;
  innovation_diagnostic?: string;
  innovation_target?: string;
  innovation_specificity?: string;
  innovation_sector_alignment?: string;
  objectives?: Array<{ objective: string; result: string }>;
  future_objectives?: string;
  status?: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  submitted_at?: string;
  created_at?: string;
  updated_at?: string;
};
