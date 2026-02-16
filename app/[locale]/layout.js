export async function generateMetadata({ params }) {
  const { locale } = await params;
  const resolvedLocale = locale || 'en';
  
  const descriptions = {
    en: "Hello! I'm Alisson Rodrigues and this is my website. Check it out!",
    pt: "Olá! Eu sou Alisson Rodrigues e este é o meu site. Dê uma olhada!",
    es: "¡Hola! Soy Alisson Rodrigues y este es mi sitio web. ¡Échale un vistazo!",
  };
  
  return {
    title: "Alisson Rodrigues CV",
    description: descriptions[resolvedLocale] || descriptions.en,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function LocaleLayout({ children }) {
  return <>{children}</>;
}

