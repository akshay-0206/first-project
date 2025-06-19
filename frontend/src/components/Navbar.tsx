"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const pathname = usePathname();
   const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Successfully logged out!");
    router.push("/login");
  };

  const isAuthPage =
    pathname === "/home" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/profile";

  const navLinks = [
    { label: "Home", href: "/home" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Profile", href: "/profile" },
  ];

   useEffect(() => {
    setIsClient
    (true);
  }, []);

  const handleAppClick = () => {
    if (isAuthPage && pathname !== "/home") {
      router.push("/home");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <nav className="w-full flex items-center justify-between px-6 py-4 shadow-sm border-b bg-white sticky top-0 z-50">
        <h1
        onClick={handleAppClick}
        className="text-2xl font-extrabold text-blue-600 tracking-tight cursor-pointer"
      >
        My App
      </h1>

        {isAuthPage && (
          <div className="hidden md:flex gap-6 items-center text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "transition-colors duration-200 hover:text-blue-600",
                  pathname === link.href
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 rounded text-red-500 hover:text-white hover:bg-red-500 border border-red-500 transition"
            >
              Logout
            </button>
          </div>
        )}

        <div className="relative md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-md transition"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md py-2 z-50 animate-fade-in">
              {isAuthPage ? (
                <>
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <span
                        onClick={() => setMenuOpen(false)}
                        className={clsx(
                          "block px-4 py-2 transition-colors duration-200 cursor-pointer",
                          pathname === link.href
                            ? "bg-gray-100 font-semibold text-blue-600"
                            : "hover:bg-gray-100"
                        )}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition"
                  >
                    Logout
                  </button>
                </>
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
    </>
  );
}

export default Navbar;