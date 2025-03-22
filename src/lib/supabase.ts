
import { createClient } from '@supabase/supabase-js';

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client when environment variables are missing
// This prevents the app from crashing during development
// and allows components to render without actual database connectivity
let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using mock client for development.');
  
  // Create a mock Supabase client that returns empty data
  // This allows the app to render without crashing
  supabase = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
      eq: () => ({ data: [], error: null }),
      order: () => ({ data: [], error: null }),
    }),
    auth: {
      signIn: () => Promise.resolve({ user: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
  };
} else {
  // Create the actual Supabase client when environment variables are available
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
