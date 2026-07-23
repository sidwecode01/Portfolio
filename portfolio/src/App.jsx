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
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App
