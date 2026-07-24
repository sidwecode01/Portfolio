import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import About from './components/About';
import { AuthProvider } from './hooks/useAuth';
import AnalyticsTracker from './components/AnalyticsTracker';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectsList from './pages/admin/ProjectsList';
import ProjectForm from './pages/admin/ProjectForm';
import CertificationsList from './pages/admin/CertificationsList';
import CertificationForm from './pages/admin/CertificationForm';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AnalyticsTracker />
        <Routes>
          {/* Site public */}
          <Route path="/" element={<Accueil />} />
          <Route path="/projet/:title" element={<About />} />

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id/edit" element={<ProjectForm />} />
            <Route path="certifications" element={<CertificationsList />} />
            <Route path="certifications/new" element={<CertificationForm />} />
            <Route path="certifications/:id/edit" element={<CertificationForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App
