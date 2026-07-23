import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { session, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        Chargement...
      </div>
    );
  }

  // Il faut etre connecte ET figurer dans la liste blanche des admins.
  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
