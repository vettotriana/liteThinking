import { useEffect, useState } from 'react';
import api from '../api/api';
import AddProductForm from './AddProductoForm';
import ManageCategories from './ManageCategories';
import CategoryManagement from './CategoryManagement';

const ProductList = ({ empresaNit, empresaNombre, setEmpresaSeleccionada }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarGestionCategorias, setMostrarGestionCategorias] = useState(false);
  const [mostrarCampoEmail, setMostrarCampoEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [enviandoCorreo, setEnviandoCorreo] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get(`/api/productos/empresa/${empresaNit}`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, [empresaNit]);

  const handleProductAdded = (nuevoProducto) => {
    setProductos((prev) => [...prev, nuevoProducto]);
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('https://3sdtdj4fnbfdi7vcyausmtwbja0sostb.lambda-url.us-east-1.on.aws/', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error al generar el PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'productos.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setEnviandoCorreo(true);

    try {
      const response = await fetch('https://zxntb4idvd2pam2fg2ywpwarfq0ncfmk.lambda-url.us-east-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el correo.');
      }

      alert('Correo enviado exitosamente.');
      setEmail('');
      setMostrarCampoEmail(false);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un error al enviar el correo.');
    } finally {
      setEnviandoCorreo(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setEmpresaSeleccionada(null)}>Volver</button>
        <button onClick={() => setMostrarGestionCategorias(true)}>Administrar Categorías</button>
        <button onClick={handleDownloadPDF}>Descargar Productos PDF</button>
        <button onClick={() => setMostrarCampoEmail(!mostrarCampoEmail)}>
          {mostrarCampoEmail ? 'Cancelar Envío' : 'Enviar PDF por Email'}
        </button>
      </div>

      {mostrarCampoEmail && (
        <div style={{ marginTop: '10px' }}>
          <input
            type="email"
            placeholder="Ingresa el correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '5px', marginRight: '5px' }}
          />
          <button onClick={handleSendEmail} disabled={enviandoCorreo}>
            {enviandoCorreo ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      )}

      <h2>Productos de {empresaNombre}</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} - {producto.descripcion} (${producto.precio})
              <button onClick={() => setProductoSeleccionado(producto)}>Gestionar Categorías</button>
            </li>
          ))}
        </ul>
      )}

      {productoSeleccionado && (
        <ManageCategories
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}

      {mostrarGestionCategorias && (
        <CategoryManagement onClose={() => setMostrarGestionCategorias(false)} />
      )}

      <AddProductForm empresaNit={empresaNit} onProductAdded={handleProductAdded} />
    </div>
  );
};

export default ProductList;
