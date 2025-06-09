"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const isAuthPage = pathname === "/home";

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-sm border-b bg-white relative">
      <h1 className="text-xl font-bold text-blue-600">My App</h1>

      <div className="relative hidden md:block">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md py-2 z-50">
            {isAuthPage ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">
                  <span
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Login
                  </span>
                </Link>
                <Link href="/signup">
                  <span
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Signup
                  </span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
