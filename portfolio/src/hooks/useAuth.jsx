/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const AuthContext = createContext({
  session: null,
  user: null,
  isAdmin: false,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

// Verifie que l'utilisateur figure dans la liste blanche public.admins.
// La securite reelle est cote base (RLS) ; ceci sert a piloter l'UI.
async function checkIsAdmin(session) {
  if (!isSupabaseConfigured || !session) return false;
  const { data, error } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", session.user.id)
    .maybeSingle();
  return Boolean(data) && !error;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      setIsAdmin(await checkIsAdmin(data.session));
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setIsAdmin(await checkIsAdmin(session));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase n'est pas configure (voir SUPABASE_SETUP.md).");
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const admin = await checkIsAdmin(data.session);
    if (!admin) {
      // Compte valide mais pas autorise : on le deconnecte immediatement.
      await supabase.auth.signOut();
      setSession(null);
      setIsAdmin(false);
      throw new Error("Ce compte n'a pas les droits d'administration.");
    }
    return data;
  };

  const signOut = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, isAdmin, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
