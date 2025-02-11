import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InventoryView = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', quantity: '', price: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, { ...form, id: Date.now() }]);
    setForm({ name: '', category: '', quantity: '', price: '' });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Inventario de Productos', 14, 16);

    const tableColumn = ["Producto", "Categoría", "Cantidad", "Precio"];
    const tableRows = products.map(({ name, category, quantity, price }) => [name, category, quantity, price]);

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save('inventario.pdf');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre del Producto"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={form.category}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Agregar Producto
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6 mb-2">Productos Registrados</h2>
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Producto</th>
            <th className="border p-2">Categoría</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.quantity}</td>
              <td className="border p-2">${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={generatePDF}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        disabled={products.length === 0}
      >
        Descargar PDF
      </button>
    </div>
  );
};

export default InventoryView;
