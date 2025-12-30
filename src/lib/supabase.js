import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth Helper Functions
export const signUp = async (email, password, metadata = {}) => {
    return await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
    });
};

export const signIn = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
    return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
    return await supabase.auth.getUser();
};

export const getSession = async () => {
    return await supabase.auth.getSession();
};
