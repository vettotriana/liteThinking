import { useEffect, useState } from 'react';
import AddProductoForm from '../components/AddProductoForm';
import ProductoList from '../components/ProductoList';
import api from '../api/api';

const ProductosPage = ({ empresaNit }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get(`/productos/empresa/${empresaNit}`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, [empresaNit]);

  const handleAddProducto = (nuevoProducto) => {
    setProductos((prev) => [...prev, nuevoProducto]);
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <AddProductoForm onAddProducto={handleAddProducto} empresaNit={empresaNit} />
      <ProductoList productos={productos} setProductos={setProductos} />
    </div>
  );
};

export default ProductosPage;
