import React, { useState, useEffect } from 'react';
import api from '../api/api';

const EmpresaList = ({ setEmpresas, setEmpresaSeleccionada }) => {
  const [empresas, setLocalEmpresas] = useState([]);
  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await api.get('/api/empresas');
        setLocalEmpresas(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error al obtener empresas:', error);
        setLocalEmpresas([]);
      }
    };
    fetchEmpresas();
  }, []);

  const handleDelete = async (nit) => {
    try {
      await api.delete(`/api/empresas/eliminar/${nit}`);
      setLocalEmpresas(empresas.filter((empresa) => empresa.nit !== nit));
      alert('Empresa eliminada exitosamente.');
    } catch (error) {
      console.error('Error al eliminar la empresa:', error);
      alert('Hubo un error al eliminar la empresa.');
    }
  };

  const handleEdit = (empresa) => {
    setEditingEmpresa(empresa.nit);
    setEditedData({ ...empresa });
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/empresas/editar/${editingEmpresa}`, editedData);
      setLocalEmpresas(
        empresas.map((empresa) =>
          empresa.nit === editingEmpresa ? { ...empresa, ...editedData } : empresa
        )
      );
      setEditingEmpresa(null);
      alert('Empresa actualizada exitosamente.');
    } catch (error) {
      console.error('Error al actualizar la empresa:', error);
      alert('Hubo un error al actualizar la empresa.');
    }
  };

  const handleCancel = () => {
    setEditingEmpresa(null);
    setEditedData({});
  };

  const handleViewProducts = (empresa) => {
    setEmpresaSeleccionada(empresa);
  };

  return (
    <div>
      <h2>Empresas Registradas</h2>
      {empresas.length === 0 ? (
        <p>No hay empresas registradas.</p>
      ) : (
        <ul>
          {empresas.map((empresa) => (
            <li key={empresa.nit}>
              {editingEmpresa === empresa.nit ? (
                <>
                  <input
                    type="text"
                    value={editedData.nombre || ''}
                    onChange={(e) => setEditedData({ ...editedData, nombre: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editedData.direccion || ''}
                    onChange={(e) => setEditedData({ ...editedData, direccion: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editedData.telefono || ''}
                    onChange={(e) => setEditedData({ ...editedData, telefono: e.target.value })}
                  />
                  <button onClick={handleSave}>Guardar</button>
                  <button onClick={handleCancel}>Cancelar</button>
                </>
              ) : (
                <>
                  <strong>{empresa.nombre}</strong> - {empresa.direccion} ({empresa.telefono})
                  <button onClick={() => handleViewProducts(empresa)}>Ver Productos</button>
                  <button onClick={() => handleEdit(empresa)}>Editar</button>
                  <button onClick={() => handleDelete(empresa.nit)}>Eliminar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmpresaList;
