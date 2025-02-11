import mysql from 'mysql2/promise';
import PDFDocument from 'pdfkit';

export const handler = async (event) => {
    // Conexión a la base de datos
    const connection = await mysql.createConnection({
        host: 'pruebas.c9e2gaymspn1.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'PRUEBA123',
        database: 'business_inventory_db'
    });

    const [rows] = await connection.execute('SELECT * FROM producto');

    // Generar PDF
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {});

    doc.fontSize(16).text('Inventario de Productos', { align: 'center' });
    doc.moveDown();

    rows.forEach((producto, index) => {
        doc.fontSize(12).text(`${index + 1}. ${producto.nombre} - ${producto.categoria} - Stock: ${producto.stock}`);
    });

    doc.end();

    // Convertir a base64 para enviar en la respuesta HTTP
    const pdfBuffer = await new Promise((resolve) => {
        doc.on('end', () => {
            resolve(Buffer.concat(buffers));
        });
    });

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=inventory.pdf'
        },
        body: pdfBuffer.toString('base64'),
        isBase64Encoded: true
    };
};
