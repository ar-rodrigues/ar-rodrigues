# Alisson Rodrigues CV

Un proyecto de currículum vitae personal desarrollado con Next.js 15, Tailwind CSS 4 y autenticación con Supabase.

## 🚀 Características

- **Next.js 15** - Framework de React con App Router
- **Tailwind CSS 4** - Framework de CSS utility-first
- **Autenticación** - Sistema de login/logout con Supabase
- **Responsive Design** - Interfaz adaptativa para todos los dispositivos
- **Estructura Organizada** - Código limpio y bien estructurado
- **Iconos React** - Biblioteca de iconos moderna y ligera
- **Nodemailer** - Sistema de envío de emails configurado

## 🛠️ Tecnologías

- Next.js 15.4.6
- React 19.1.0
- Tailwind CSS 4.1.11
- Supabase (autenticación y base de datos)
- React Icons
- Nodemailer (envío de emails)

## 🚀 Comenzar

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📁 Estructura del Proyecto

```
app/
├── (public)/          # Rutas públicas
│   ├── page.js        # Página principal
│   ├── login/         # Sistema de autenticación
│   └── error/         # Página de error
├── (private)/         # Rutas privadas
│   └── private/       # Dashboard protegido
└── globals.css        # Estilos globales

components/             # Componentes reutilizables
utils/                  # Utilidades y configuración
├── supabase/          # Cliente y configuración de Supabase
└── mailer/            # Sistema de envío de emails
```

## 🔧 Configuración

1. Configura las variables de entorno para Supabase
2. Personaliza los estilos en `app/globals.css`
3. Modifica los componentes según tus necesidades
4. Añade nuevas funcionalidades al dashboard

## 📧 Nodemailer

El proyecto incluye **Nodemailer** configurado para el envío de emails. Está ubicado en `utils/mailer/` y incluye:

### Configuración Básica

```javascript
// utils/mailer/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

### Variables de Entorno Requeridas

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación
```

### Uso Básico

```javascript
import { sendEmail } from "@/utils/mailer/mailer";

// Enviar email simple
await sendEmail({
  to: "destinatario@email.com",
  subject: "Asunto del email",
  html: "<h1>Contenido HTML</h1>",
});

// Usar plantillas predefinidas
import { sendWelcomeEmail } from "@/utils/mailer/templates/welcomeEmail";
await sendWelcomeEmail("usuario@email.com", "Nombre Usuario");
```

### Plantillas Disponibles

- **welcomeEmail.js** - Email de bienvenida para nuevos usuarios
- Fácil de personalizar y extender según tus necesidades

## 📚 Aprender Más

Para aprender más sobre Next.js, consulta estos recursos:

- [Documentación de Next.js](https://nextjs.org/docs)
- [Tutorial de Next.js](https://nextjs.org/learn)
- [Repositorio de Next.js](https://github.com/vercel/next.js)

## 🚀 Desplegar

La forma más fácil de desplegar tu aplicación Next.js es usar [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
