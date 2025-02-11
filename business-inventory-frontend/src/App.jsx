import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmpresasPage from './pages/EmpresasPage';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === role ? children : <Navigate to="/" />;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/empresas" element={<PrivateRoute role="ADMIN"><EmpresasPage /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute role="EXTERNO"><Dashboard /></PrivateRoute>} />
    </Routes>
  </Router>
);

export default App;
