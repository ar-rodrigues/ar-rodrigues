"use client";

import {
  RiRocketLine,
  RiTeamLine,
  RiUserLine,
  RiDashboardLine,
  RiLogoutBoxLine,
  RiMenuLine,
} from "react-icons/ri";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export default function PrivateLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useLanguage();
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const supabase = createClient();

  // Extract path without locale for comparison with menu keys
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/${locale}/login`);
        return;
      }
      setUser(user);
    };
    getUser();
  }, [supabase.auth, router, locale]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${locale}`);
  };

  const menuItems = [
    {
      key: "/private",
      icon: <RiDashboardLine />,
      label: "Dashboard",
    },
    {
      key: "/private/features",
      icon: <RiRocketLine />,
      label: "Características",
    },
    {
      key: "/private/components",
      icon: <RiTeamLine />,
      label: "Componentes",
    },
    {
      key: "/private/profile",
      icon: <RiUserLine />,
      label: "Mi Perfil",
    },
  ];

  const handleMenuClick = (key) => {
    router.push(key);
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <RiRocketLine className="text-2xl text-blue-600" />
            {!collapsed && (
              <h1 className="text-lg font-semibold text-gray-800">
                Alisson Rodrigues CV
              </h1>
            )}
          </div>
        </div>

        <nav className="py-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                pathWithoutLocale === item.key
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <RiMenuLine className="text-lg" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <RiUserLine className="text-white text-sm" />
              </div>
              {!collapsed && (
                <span className="text-gray-700">{user.email}</span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <RiLogoutBoxLine />
              {!collapsed && <span>Cerrar Sesión</span>}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
