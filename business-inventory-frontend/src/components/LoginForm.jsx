import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/api';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 🔑 Importante para la redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);

      const response = await api.post('/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      console.log('Respuesta del servidor:', response.data);

      const role = response.data.authorities.includes('ROLE_ADMIN') ? 'ADMIN' : 'EXTERNO';
      localStorage.setItem('user', JSON.stringify({ username, role }));

      if (role === 'ADMIN') {
        navigate('/empresas');  // ✅ Redirige al panel de administración
      } else {
        navigate('/dashboard');  // ✅ Redirige al panel del usuario externo
      }
    } catch (err) {
      console.error('Error de autenticación:', err.response?.data || err.message);
      setError('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default LoginForm;
