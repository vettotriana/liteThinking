import { useState } from 'react';
import api from '../api/api';

const AddEmpresaForm = ({ onAddEmpresa }) => {
  const [nit, setNit] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/empresas/crear', {
        nit,
        nombre,
        direccion,
        telefono
      });

      alert('Empresa creada exitosamente');

      // ✅ Actualizar el listado de empresas sin recargar la página
      onAddEmpresa(response.data); 

      // Limpiar el formulario
      setNit('');
      setNombre('');
      setDireccion('');
      setTelefono('');
    } catch (error) {
      console.error('Error al crear la empresa:', error);
      alert('Hubo un error al crear la empresa.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Nueva Empresa</h2>
      <input
        type="text"
        placeholder="NIT"
        value={nit}
        onChange={(e) => setNit(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nombre de la Empresa"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <button type="submit">Agregar Empresa</button>
    </form>
  );
};

export default AddEmpresaForm;
