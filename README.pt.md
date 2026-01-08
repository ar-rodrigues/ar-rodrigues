# Alisson Rodrigues CV

**Currículo Interativo** - Este é o repositório do CV pessoal de Alisson Rodrigues, desenvolvido como uma aplicação web moderna com Next.js 15, Tailwind CSS 4 e autenticação com Supabase.

**Ler em outros idiomas:** [English](README.md) | [Español](README.es.md)

## 🌐 Ver CV Online

**👉 [Ver meu CV online](https://alisson-rodrigues.netlify.app/)**

Este projeto representa o meu currículo profissional num formato web interativo, onde pode explorar a minha experiência, competências, educação e portefólio de projetos.

## 📋 Sobre este CV

Este é o meu currículo profissional apresentado como uma aplicação web moderna. Inclui secções de:

- **Sobre Mim** - Informação pessoal e profissional
- **Experiência** - Histórico profissional e projetos destacados
- **Educação e Cursos** - Formação académica e certificações
- **Competências** - Tecnologias e competências técnicas
- **Portfólio** - Projetos realizados com links e demonstrações
- **Contacto** - Formulário de contacto integrado

## 🚀 Características Técnicas

- **Next.js 15** - Framework de React com App Router
- **Tailwind CSS 4** - Framework de CSS utility-first
- **Autenticação** - Sistema de login/logout com Supabase
- **Responsive Design** - Interface adaptativa para todos os dispositivos
- **Multi-idioma** - Suporte para espanhol, inglês e português
- **Estrutura Organizada** - Código limpo e bem estruturado
- **Ícones React** - Biblioteca de ícones moderna e leve
- **Nodemailer** - Sistema de envio de e-mails configurado

## 🛠️ Tecnologias

- Next.js 15.4.6
- React 19.1.0
- Tailwind CSS 4.1.11
- Supabase (autenticação e base de dados)
- React Icons
- Nodemailer (envio de e-mails)

## 🚀 Começar

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# o
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📁 Estrutura do Projeto

```
app/
├── (public)/          # Rotas públicas
│   ├── page.js        # Página principal
│   ├── login/         # Sistema de autenticação
│   └── error/         # Página de erro
├── (private)/         # Rotas privadas
│   └── private/       # Dashboard protegido
└── globals.css        # Estilos globais

components/             # Componentes reutilizáveis
utils/                  # Utilidades e configuração
├── supabase/          # Cliente e configuração do Supabase
└── mailer/            # Sistema de envio de e-mails
```

## 🔧 Configuração

1. Configure as variáveis de ambiente para o Supabase
2. Personalize os estilos em `app/globals.css`
3. Modifique os componentes de acordo com as suas necessidades
4. Adicione novas funcionalidades ao dashboard

## 📧 Nodemailer

O projeto inclui o **Nodemailer** configurado para o envio de e-mails. Está localizado em `utils/mailer/` e inclui:

### Configuração Básica

```javascript
// utils/mailer/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true para 465, false para outros portos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

### Variáveis de Ambiente Necessárias

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=teu-email@gmail.com
SMTP_PASS=tua-senha-de-aplicativo
```

### Uso Básico

```javascript
import { sendEmail } from "@/utils/mailer/mailer";

// Enviar e-mail simples
await sendEmail({
  to: "destinatario@email.com",
  subject: "Assunto do e-mail",
  html: "<h1>Conteúdo HTML</h1>",
});

// Usar templates predefinidos
import { sendWelcomeEmail } from "@/utils/mailer/templates/welcomeEmail";
await sendWelcomeEmail("usuario@email.com", "Nome Usuário");
```

### Templates Disponíveis

- **welcomeEmail.js** - E-mail de boas-vindas para novos usuários
- Fácil de personalizar e estender de acordo com as suas necessidades

## 📚 Aprender Mais

Para aprender mais sobre o Next.js, consulte estes recursos:

- [Documentação do Next.js](https://nextjs.org/docs)
- [Tutorial do Next.js](https://nextjs.org/learn)
- [Repositório do Next.js](https://github.com/vercel/next.js)

## 🚀 Implementação (Deploy)

A forma mais fácil de implementar a sua aplicação Next.js é usar a [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## 📝 Licença

Este projeto está sob a Licença MIT.
