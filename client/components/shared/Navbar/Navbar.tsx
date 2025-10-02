"use client";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/lib/auth";

import Link from "next/link";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type User = {
  email?: string;
  // add other user properties if needed
};

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user: curUser } = await getCurrentUser();
        setUser(curUser);
      } catch {
        console.error("Falied to load user");
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Failed to logged out");
    }
  };

  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-full bg-background border dark:border-slate-700/70 z-30">
      <div className="flex h-full items-center justify-between px-6 md:px-8">
        {/* Logo with consistent padding */}
        <Link href="/" className="flex-shrink-0 font-bold">
          {/* <Logo /> */}
          Hamad
        </Link>

        {/* Desktop Menu with consistent horizontal spacing */}
        <NavMenu className="hidden md:block" />

        {/* Actions and Mobile Menu */}
        <div className="flex items-center gap-4 md:gap-6">
          {user && user.email ? (
            <Button onClick={handleLogout} className="block w-full text-center">
              Logout
            </Button>
          ) : (
            <Link href="/login" className="block w-full text-center">
              <Button className="rounded-full px-5 py-2 text-sm md:text-base cursor-pointer">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
