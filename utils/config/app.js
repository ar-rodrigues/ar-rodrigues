/**
 * Configuración central de la aplicación
 * Centraliza rutas públicas, menús, y configuraciones generales
 */

// ============================================================================
// RUTAS PÚBLICAS (No requieren autenticación)
// ============================================================================
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/auth",
  "/public",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
  "/help",
  "/faq",
  "/api/public",
  "/api/contact",
];

// Patrones de rutas públicas (regex)
export const PUBLIC_PATTERNS = [
  /^\/public\/.*$/, // Todas las rutas que empiecen con /public/
  /^\/api\/public\/.*$/, // Todas las rutas de API públicas
  /^\/blog\/.*$/, // Todas las rutas de blog
];

// ============================================================================
// RUTAS PROTEGIDAS (Requieren autenticación)
// ============================================================================
export const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/admin",
  "/events/create",
  "/events/manage",
  "/guests",
  "/reports",
  "/settings",
  "/api/protected",
];

// ============================================================================
// MENÚ PRINCIPAL DE NAVEGACIÓN
// ============================================================================
export const MAIN_MENU = [
  {
    key: "home",
    label: "Inicio",
    path: "/",
    icon: "RiHomeLine",
    public: true,
  },
  {
    key: "features",
    label: "Características",
    path: "/features",
    icon: "RiRocketLine",
    public: true,
    children: [
      {
        key: "features-browse",
        label: "Explorar Características",
        path: "/features",
        public: true,
      },
      {
        key: "features-create",
        label: "Crear Característica",
        path: "/features/create",
        public: false,
      },
      {
        key: "features-manage",
        label: "Mis Características",
        path: "/features/manage",
        public: false,
      },
    ],
  },
  {
    key: "components",
    label: "Componentes",
    path: "/components",
    icon: "RiCodeLine",
    public: false,
  },
  {
    key: "about",
    label: "Acerca de",
    path: "/about",
    icon: "RiInformationLine",
    public: true,
  },
  {
    key: "contact",
    label: "Contacto",
    path: "/contact",
    icon: "RiMailLine",
    public: true,
  },
];

// ============================================================================
// MENÚ DE USUARIO (Header derecho)
// ============================================================================
export const USER_MENU = [
  {
    key: "profile",
    label: "Mi Perfil",
    path: "/profile",
    icon: "RiUserLine",
  },
  {
    key: "settings",
    label: "Configuración",
    path: "/settings",
    icon: "RiSettings3Line",
  },
  {
    key: "help",
    label: "Ayuda",
    path: "/help",
    icon: "RiQuestionLine",
  },
  {
    key: "logout",
    label: "Cerrar Sesión",
    icon: "RiLogoutBoxLine",
    action: "logout",
  },
];

// ============================================================================
// MENÚ FOOTER
// ============================================================================
export const FOOTER_MENU = [
  {
    key: "about",
    label: "Acerca de",
    path: "/about",
  },
  {
    key: "contact",
    label: "Contacto",
    path: "/contact",
  },
  {
    key: "terms",
    label: "Términos y Condiciones",
    path: "/terms",
  },
  {
    key: "privacy",
    label: "Política de Privacidad",
    path: "/privacy",
  },
  {
    key: "help",
    label: "Ayuda",
    path: "/help",
  },
];

// ============================================================================
// CONFIGURACIÓN DE LA APLICACIÓN
// ============================================================================
export const APP_CONFIG = {
  name: "Alisson Rodrigues CV",
  description:
    "Un proyecto base completo y listo para usar con Next.js 15, Tailwind CSS 4 y autenticación",
  version: "1.0.0",
  author: "Tu Empresa",
  supportEmail: "soporte@tuempresa.com",

  // Configuración de autenticación
  auth: {
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
    refreshTokenThreshold: 5 * 60 * 1000, // 5 minutos antes de expirar
    redirectAfterLogin: "/",
    redirectAfterLogout: "/login",
  },

  // Configuración del proyecto
  project: {
    maxFeatures: 100,
    maxComponents: 50,
    allowedFeatureTypes: [
      "autenticación",
      "base de datos",
      "api",
      "ui",
      "otro",
    ],
    defaultFeatureDuration: 120, // minutos
  },

  // Configuración de UI
  ui: {
    theme: "light", // light, dark, auto
    language: "es",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    pagination: {
      defaultPageSize: 10,
      pageSizeOptions: [5, 10, 20, 50],
    },
  },
};

// ============================================================================
// FUNCIONES UTILITARIAS
// ============================================================================

/**
 * Verifica si una ruta es pública
 * @param {string} pathname - La ruta a verificar
 * @returns {boolean} - True si la ruta es pública
 */
export function isPublicRoute(pathname) {
  // Limpiar el locale de la ruta para verificar contra PUBLIC_ROUTES
  const supportedLocales = ["es", "en", "pt"];
  const parts = pathname.split("/");
  const pathWithoutLocale = supportedLocales.includes(parts[1])
    ? "/" + parts.slice(2).join("/")
    : pathname;

  // Normalizar path (quitar slash final si no es solo /)
  const normalizedPath =
    pathWithoutLocale.length > 1 && pathWithoutLocale.endsWith("/")
      ? pathWithoutLocale.slice(0, -1)
      : pathWithoutLocale;

  // Verificar rutas exactas
  if (PUBLIC_ROUTES.includes(normalizedPath)) {
    return true;
  }

  // Verificar patrones regex
  if (PUBLIC_PATTERNS.some((pattern) => pattern.test(normalizedPath))) {
    return true;
  }

  return false;
}

/**
 * Verifica si una ruta está protegida
 * @param {string} pathname - La ruta a verificar
 * @returns {boolean} - True si la ruta está protegida
 */
export function isProtectedRoute(pathname) {
  // Limpiar el locale de la ruta
  const supportedLocales = ["es", "en", "pt"];
  const parts = pathname.split("/");
  const pathWithoutLocale = supportedLocales.includes(parts[1])
    ? "/" + parts.slice(2).join("/")
    : pathname;

  const normalizedPath =
    pathWithoutLocale.length > 1 && pathWithoutLocale.endsWith("/")
      ? pathWithoutLocale.slice(0, -1)
      : pathWithoutLocale;

  return PROTECTED_ROUTES.some((route) => normalizedPath.startsWith(route));
}

/**
 * Obtiene el menú principal filtrado por permisos del usuario
 * @param {boolean} isAuthenticated - Si el usuario está autenticado
 * @returns {Array} - Menú filtrado
 */
export function getFilteredMainMenu(isAuthenticated) {
  return MAIN_MENU.filter((item) => {
    if (item.public === undefined) return true; // Si no se especifica, mostrar siempre
    return item.public || isAuthenticated;
  }).map((item) => {
    if (item.children) {
      return {
        ...item,
        children: item.children.filter(
          (child) =>
            child.public === undefined || child.public || isAuthenticated
        ),
      };
    }
    return item;
  });
}

/**
 * Obtiene el menú de usuario filtrado
 * @param {boolean} isAuthenticated - Si el usuario está autenticado
 * @returns {Array} - Menú de usuario filtrado
 */
export function getFilteredUserMenu(isAuthenticated) {
  if (!isAuthenticated) {
    return [];
  }
  return USER_MENU;
}

/**
 * Obtiene la configuración de la aplicación
 * @returns {Object} - Configuración de la app
 */
export function getAppConfig() {
  return APP_CONFIG;
}
