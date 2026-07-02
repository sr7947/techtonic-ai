import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize client (gracefully allows blank strings locally before config)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
