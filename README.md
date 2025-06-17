# Customer Relationship Management (CRM) – App en Desarrollo

Una aplicación web para registrar, visualizar y administrar clientes, con modulos de CRM, control financiero y sistema de autenticación basado en roles. Esta versión es una reescritura completa del front-end en Angular (anteriormente usando Vue).

> 🚧 Proyecto en desarrollo – funcionalidades sujetas a cambios.

---

## 🛠 Tecnologías utilizadas

### Frontend
- [Angular](https://angular.io/)
- TailwindCSS
- TypeScript

### Backend
- Node.js + Express
- MongoDB (con Mongoose)

---

## 🚀 Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/TechDev-01/crm-app.git
cd crm-app
```
## Instalar dependencias

### Front-end
```bash
cd front-end
npm install
```

### Back-end
```bash
cd back-end
npm install
```

## Variables de entorno
Crea un archivo `.env` en `/back-end` con las variables necesarias.
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/crm-app
```

## Levantar servidores 

### Back-end
```bash
cd back-end
npm run dev
```

### Front-end 
```bash
cd front-end
npm start
```
