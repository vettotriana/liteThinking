import { useState, useEffect } from 'react';
import EmpresaList from "../components/EmpresaList";
import AddEmpresaForm from "../components/AddEmpresaForm";
import ProductoList from "../components/ProductoList"; // ✅ Importamos el componente de productos
import api from "../api/api";

const EmpresasPage = () => {
  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null); // ✅ Estado para la empresa seleccionada

  const fetchEmpresas = async () => {
    try {
      const response = await api.get('/api/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error al obtener las empresas:', error);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handleAddEmpresa = (nuevaEmpresa) => {
    setEmpresas((prevEmpresas) => [...prevEmpresas, nuevaEmpresa]);
  };

  return (
    <div>
      <h1>Dashboard de Empresas</h1>

      {empresaSeleccionada ? ( // ✅ Si hay una empresa seleccionada, mostramos sus productos
        <ProductoList 
        empresaNit={empresaSeleccionada.nit} 
        empresaNombre={empresaSeleccionada.nombre} 
        setEmpresaSeleccionada={setEmpresaSeleccionada} // ✅ Aquí está la corrección
      />
      
      ) : (
        <>
          <AddEmpresaForm onAddEmpresa={handleAddEmpresa} />
          <EmpresaList
            empresas={empresas}
            setEmpresas={setEmpresas}
            setEmpresaSeleccionada={setEmpresaSeleccionada} // ✅ Pasamos la función al componente
          />
        </>
      )}
    </div>
  );
};

export default EmpresasPage;
