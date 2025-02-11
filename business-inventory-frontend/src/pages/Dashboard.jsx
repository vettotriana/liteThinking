import { useState, useEffect } from 'react';
import EmpresaList from '../components/EmpresaList';
import api from '../api/api'; // Asegúrate de que api esté configurado correctamente

const Dashboard = () => {
  const [empresas, setEmpresas] = useState([]);

  // ✅ Función para obtener las empresas desde la API
  const fetchEmpresas = async () => {
    try {
      const response = await api.get('/api/empresas'); // Solicitud a la API
      setEmpresas(response.data); // Guardar datos en el estado
    } catch (error) {
      console.error('Error al obtener las empresas:', error);
    }
  };

  // ✅ Cargar empresas al cargar la página
  useEffect(() => {
    fetchEmpresas();
  }, []);

  return (
    <div>
      <h1>Empresas Disponibles</h1>
      <EmpresaList empresas={empresas} />  {/* Pasar la lista de empresas como prop */}
    </div>
  );
};

export default Dashboard;
