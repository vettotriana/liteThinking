import { useState } from 'react';
import api from '../api/api';

const AddProductoForm = ({ empresaNit, onProductAdded }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevoProducto = {
        nombre,
        descripcion,
        precio,
      };

      const response = await api.post(`/api/productos/crear?empresaNit=${empresaNit}`, nuevoProducto);
      onProductAdded(response.data);
      setNombre('');
      setDescripcion('');
      setPrecio('');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProductoForm;
