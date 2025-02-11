import { useEffect, useState } from 'react';
import api from '../api/api';

const ManageCategories = ({ producto, onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState(
    producto.categorias.map((cat) => cat.id)
  );

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await api.get('/api/categorias');
      setCategorias(response.data);
    };
    fetchCategorias();
  }, []);

  const handleToggle = (categoriaId) => {
    setSelectedCategorias((prev) =>
      prev.includes(categoriaId)
        ? prev.filter((id) => id !== categoriaId)
        : [...prev, categoriaId]
    );
  };

  const handleSave = async () => {
    await api.put(`/api/productos/${producto.id}/categorias`, selectedCategorias);
    onClose(); // Cerrar la vista después de guardar
  };

  return (
    <div>
      <h3>Gestionar Categorías para {producto.nombre}</h3>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategorias.includes(categoria.id)}
                onChange={() => handleToggle(categoria.id)}
              />
              {categoria.nombre}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ManageCategories;
