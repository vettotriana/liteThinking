import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";
import mysql from 'mysql2/promise';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
    try {
        const { email } = JSON.parse(event.body);

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

        const pdfBuffer = await new Promise((resolve) => {
            doc.on('end', () => {
                resolve(Buffer.concat(buffers));
            });
        });

        const attachment = pdfBuffer.toString('base64');

        // Construir el correo en formato MIME
        const boundary = "----=_Boundary_123456";
        const rawEmail = [
            `From: no-reply@enithgma.com`,
            `To: ${email}`,
            `Subject: Inventario de Productos - PDF`,
            `MIME-Version: 1.0`,
            `Content-Type: multipart/mixed; boundary="${boundary}"`,
            ``,
            `--${boundary}`,
            `Content-Type: text/plain; charset="UTF-8"`,
            `Content-Transfer-Encoding: 7bit`,
            ``,
            `Adjunto encontrarás el PDF con el inventario de productos.`,
            ``,
            `--${boundary}`,
            `Content-Type: application/pdf; name="Inventario.pdf"`,
            `Content-Description: Inventario.pdf`,
            `Content-Disposition: attachment; filename="Inventario.pdf"; size=${pdfBuffer.length};`,
            `Content-Transfer-Encoding: base64`,
            ``,
            `${attachment}`,
            `--${boundary}--`
        ].join('\r\n');

        const params = {
            RawMessage: {
                Data: Buffer.from(rawEmail),
            }
        };

        await ses.send(new SendRawEmailCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Correo enviado exitosamente con el adjunto." }),
        };
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al enviar el correo." }),
        };
    }
};
