# 📦 Business Inventory Management System

Este proyecto es un **sistema de gestión de inventario** desarrollado con **React** para el frontend, **Spring Boot** para el backend, y AWS para la gestión de funciones serverless, almacenamiento y servicios de correo electrónico.

## 🚀 Tecnologías Utilizadas

- **Frontend:** React, JavaScript, CSS
- **Backend:** Spring Boot, Java
- **Base de Datos:** MySQL (Amazon RDS)
- **AWS:**
  - Lambda (funciones serverless)
  - SES (Simple Email Service para envío de correos)
  - Amplify (despliegue del frontend)
  - Elastic Beanstalk (despliegue del backend)
  - RDS (almacenamiento de base de datos)

---

## 🌍 Despliegue

- **Frontend:** [Amplify App](https://staging.d1yvaa9860vy7f.amplifyapp.com/)
- **Backend:** Elastic Beanstalk (`http://p1-env.eba-shzd9re9.us-east-1.elasticbeanstalk.com:5000`)


## 📋 Funcionalidades Principales

### 1️⃣ Gestión de Empresas
- Registro, edición y eliminación de empresas.
- Visualización de la lista de empresas.

### 2️⃣ Gestión de Productos
- Registro de productos asociados a cada empresa.
- Edición y eliminación de productos.
- Asignación de categorías a productos.

### 3️⃣ Generación de Reportes PDF
- Descarga de reportes de inventario en formato PDF.
- Envío de reportes PDF por correo electrónico usando AWS SES.


## ⚡ Configuración de AWS Lambda

### 1️⃣ **Generación de PDF (Lambda)**
- **URL:** `https://3sdtdj4fnbfdi7vcyausmtwbja0sostb.lambda-url.us-east-1.on.aws/`
- Función para consultar productos en la base de datos y generar un PDF descargable.

### 2️⃣ **Envío de PDF por Email (Lambda)**
- **URL:** `https://zxntb4idvd2pam2fg2ywpwarfq0ncfmk.lambda-url.us-east-1.on.aws/`
- Envía el PDF generado a una dirección de correo electrónico proporcionada.
- Requiere el siguiente cuerpo en la solicitud:

```json
{
  "body": "{\"email\": \"destinatario@dominio.com\"}"
}
```

## 🖥️ Estructura del Proyecto

```
📦 business-inventory
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── EmpresaList.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── AddProductForm.jsx
│   │   │   └── ManageCategories.jsx
│   │   └── api
│   │       └── api.js
│   └── public
├── backend
│   ├── src
│   │   └── main
│   │       ├── java
│   │       │   └── com.business.inventory
│   │       │       ├── config
│   │       │       │   └── SecurityConfig.java
│   │       │       ├── controller
│   │       │       └── service
│   │       └── resources
│   │           └── application.properties
└── README.md
```

---

## ⚙️ Configuración del Proyecto

### 🔑 Configurar GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/business-inventory.git
git push -u origin main
```

### 🧪 Ejecutar el Proyecto Localmente

#### Backend (Spring Boot):
```bash
./mvnw spring-boot:run
```

#### Frontend (React):
```bash
npm install
npm run dev
```


### 📤 Despliegue en AWS

- **Frontend:** AWS Amplify
- **Backend:** Elastic Beanstalk
- **Funciones Serverless:** AWS Lambda
- **Correo Electrónico:** AWS SES


## 🚨 Errores Comunes y Soluciones

- **CORS Errors:** Verificar las políticas de CORS en las funciones Lambda y en el backend.
- **403 SES Access Denied:** Asegúrate de que la función Lambda tenga permisos para `ses:SendEmail`.
- **Problemas de Conexión a RDS:** Verificar las configuraciones de seguridad del grupo en AWS RDS.


## 👩‍💻 Contribución

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Agregada nueva funcionalidad"
   ```
4. Haz push a la rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request en GitHub.


## 📧 Contacto

- **Email:** contacto@hotmail.co.uk
- **Teléfono:** +57 322 7318115
- **Desarrollado por:** German Triana 🚀


---

> **Nota:** Este proyecto es parte de la infraestructura para la gestión de inventarios de Enithgma SAS, con integración de AWS para una mejor escalabilidad y rendimiento.
