import { useEffect, useState } from 'react';
import api from '../api/api';

const CategoryManagement = ({ onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  // ✅ Definir la función para obtener categorías
  const fetchCategorias = async () => {
    try {
      const response = await api.get('/api/categorias/todas'); // Ruta para obtener todas las categorías
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    fetchCategorias(); // Cargar categorías al abrir la ventana
  }, []);

  const handleAgregarCategoria = async () => {
    try {
      await api.post('/api/categorias/crear', { nombre: nuevaCategoria });
      setNuevaCategoria('');
      fetchCategorias(); // ✅ Llamada para actualizar la lista después de agregar
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <h3>Administrar Categorías</h3>
      <button onClick={onClose}>Cerrar</button>

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.nombre}</li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Nombre de la nueva categoría"
        value={nuevaCategoria}
        onChange={(e) => setNuevaCategoria(e.target.value)}
      />
      <button onClick={handleAgregarCategoria}>Agregar Categoría</button>
    </div>
  );
};

export default CategoryManagement;
