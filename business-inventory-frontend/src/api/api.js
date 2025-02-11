import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://p1-env.eba-shzd9re9.us-east-1.elasticbeanstalk.com:5000', // Sin /api para evitar rutas incorrectas
  baseURL: 'http://localhost:5000', // Sin /api para evitar rutas incorrectas
  withCredentials: true,           // Permitir cookies de sesión
});

export default api;

