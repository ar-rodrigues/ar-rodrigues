# Alisson Rodrigues CV

**Interactive Curriculum Vitae** - This is the repository for Alisson Rodrigues' personal CV, developed as a modern web application with Next.js 15, Tailwind CSS 4, and Supabase authentication.

**Read in other languages:** [Español](README.es.md) | [Português](README.pt.md)

## 🌐 View Live CV

**👉 [View my CV online](https://alisson-rodrigues.netlify.app/)**

This project represents my professional curriculum vitae in an interactive web format, where you can explore my experience, skills, education, and project portfolio.

## 📋 About this CV

This is my professional curriculum vitae presented as a modern web application. It includes sections for:

- **About Me** - Personal and professional information
- **Experience** - Work history and featured projects
- **Education & Courses** - Academic background and certifications
- **Skills** - Technologies and technical competencies
- **Portfolio** - Completed projects with links and demonstrations
- **Contact** - Integrated contact form

## 🚀 Technical Features

- **Next.js 15** - React framework with App Router
- **Tailwind CSS 4** - Utility-first CSS framework
- **Authentication** - Login/logout system with Supabase
- **Responsive Design** - Adaptive interface for all devices
- **Multilingual** - Support for Spanish, English, and Portuguese
- **Organized Structure** - Clean and well-structured code
- **React Icons** - Modern and lightweight icon library
- **Nodemailer** - Configured email sending system

## 🛠️ Technologies

- Next.js 15.4.6
- React 19.1.0
- Tailwind CSS 4.1.11
- Supabase (authentication and database)
- React Icons
- Nodemailer (email sending)

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
app/
├── (public)/          # Public routes
│   ├── page.js        # Main page
│   ├── login/         # Authentication system
│   └── error/         # Error page
├── (private)/         # Private routes
│   └── private/       # Protected dashboard
└── globals.css        # Global styles

components/             # Reusable components
utils/                  # Utilities and configuration
├── supabase/          # Supabase client and configuration
└── mailer/            # Email sending system
```

## 🔧 Configuration

1. Configure environment variables for Supabase
2. Customize styles in `app/globals.css`
3. Modify components according to your needs
4. Add new features to the dashboard

## 📧 Nodemailer

The project includes **Nodemailer** configured for sending emails. It's located in `utils/mailer/` and includes:

### Basic Configuration

```javascript
// utils/mailer/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

### Required Environment Variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Basic Usage

```javascript
import { sendEmail } from "@/utils/mailer/mailer";

// Send simple email
await sendEmail({
  to: "recipient@email.com",
  subject: "Email subject",
  html: "<h1>HTML content</h1>",
});

// Use predefined templates
import { sendWelcomeEmail } from "@/utils/mailer/templates/welcomeEmail";
await sendWelcomeEmail("user@email.com", "User Name");
```

### Available Templates

- **welcomeEmail.js** - Welcome email for new users
- Easy to customize and extend according to your needs

## 📚 Learn More

To learn more about Next.js, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Tutorial](https://nextjs.org/learn)
- [Next.js Repository](https://github.com/vercel/next.js)

## 🚀 Deploy

The easiest way to deploy your Next.js application is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## 📝 License

This project is under the MIT License.
