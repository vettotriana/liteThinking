import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/empresas');
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPage;
