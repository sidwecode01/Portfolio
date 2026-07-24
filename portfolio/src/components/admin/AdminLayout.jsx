import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { FaChartLine, FaFolderOpen, FaSignOutAlt, FaExternalLinkAlt, FaCertificate } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { to: "/admin", end: true, label: "Metriques", icon: FaChartLine },
  { to: "/admin/projects", end: false, label: "Projets", icon: FaFolderOpen },
  { to: "/admin/certifications", end: false, label: "Certifications", icon: FaCertificate },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 bg-slate-900 border-r border-slate-800 flex md:flex-col">
        <div className="p-5 border-b border-slate-800 hidden md:block">
          <p className="text-white font-bold text-lg">Portfolio Admin</p>
          <p className="text-slate-500 text-xs truncate">{user?.email}</p>
        </div>
        <nav className="flex md:flex-col flex-1 p-2 md:p-3 gap-1">
          {navItems.map(({ to, end, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-2 md:p-3 border-t border-slate-800 flex md:flex-col gap-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <FaSignOutAlt className="w-4 h-4" />
            Deconnexion
          </button>
        </div>
      </aside>

      {/* Contenu */}
      <main className="flex-1 p-5 md:p-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
