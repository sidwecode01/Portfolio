import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { isSupabaseConfigured } from "../../lib/supabase";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-white mb-1">Espace admin</h1>
        <p className="text-slate-400 text-sm mb-6">Connecte-toi pour gerer ton portfolio.</p>

        {!isSupabaseConfigured && (
          <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm p-3">
            Supabase n'est pas configure. Voir <code>SUPABASE_SETUP.md</code>.
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm p-3">
            {error}
          </div>
        )}

        <label className="block text-sm text-slate-300 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 rounded-lg bg-slate-800 border border-slate-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="admin@exemple.com"
        />

        <label className="block text-sm text-slate-300 mb-1">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 rounded-lg bg-slate-800 border border-slate-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="********"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-2.5 transition"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
