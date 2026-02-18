"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  Star,
  Image,
  Package,
  Gift,
  Calendar,
  CreditCard,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reviews", label: "Recenze", icon: Star },
  { href: "/admin/gallery", label: "Galerie", icon: Image },
  { href: "/admin/packages", label: "Balíčky", icon: Package },
  { href: "/admin/vouchers", label: "Vouchery", icon: Gift },
  { href: "/admin/bookings", label: "Rezervace", icon: Calendar },
  { href: "/admin/orders", label: "Objednávky", icon: CreditCard },
  { href: "/admin/availability", label: "Dostupnost", icon: Clock },
  { href: "/admin/settings", label: "Nastavení", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-sidebar-logo">
            KAJO <span>STUDIO</span> 360
          </Link>
          <button
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="admin-sidebar-nav">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={14} className="admin-nav-arrow" />}
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar-footer">
          <button
            className="admin-nav-item admin-logout"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut size={18} />
            <span>Odhlásit se</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="admin-topbar-spacer" />
          <div className="admin-topbar-user">
            <div className="admin-user-avatar">
              {session?.user?.name?.charAt(0) || "A"}
            </div>
            <span>{session?.user?.name || "Admin"}</span>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
