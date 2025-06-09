"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const isAuthPage = pathname === "/home";
  return (
    <nav className=" w-full flex items-center justify-between px-6 py-4 shadow-sm border-b">
      <h1 className="text-xl font-bold text-blue-600">My App</h1>

      {isAuthPage ? (
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <div className="space-x-2">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="hover:bg-gray-700">Signup</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
