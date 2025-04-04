"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import LogOutButton from "./LogOutButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, userRole } = useAuth();
  // Navigation items to avoid repetition
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" }
  ];
  const router = useRouter();
  
  function handleLogout() {
    router.push("/login");
  }

  return (
    <header className="border-b fixed top-0 w-full backdrop-blur-md bg-white/95 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="LibraryNear.com Logo"
              width={50}
              height={50}
              className="object-contain h-full"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-yellow-500 after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {userRole === "librarian" && (
            <Link
              href="/add-library"
              className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors mr-6"
            >
              Add Library
            </Link>
          )}
          {userRole === "admin" && (
            <Link
              href="/admin/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors mr-6"
            >
              Admin Dashboard
            </Link>
          )}
          {user ? (
            <LogOutButton onLogout={handleLogout} />
          ) : (
            <>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 transition-colors"
                asChild
              >
                <Link href="/login" className="hidden sm:block">
                  Log In
                </Link>
              </Button>
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm transition-all hover:shadow-md" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100 rounded-full">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white/95 backdrop-blur-md">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-8 pt-2">
                <Link href="/" className="flex items-center">
                  <div className="relative h-10 w-10">
                    <Image
                      src="/logo.png"
                      alt="LibraryNear.com Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="ml-2 text-lg font-semibold text-gray-800">LibraryNear</span>
                </Link>
              </div>
              <nav className="flex flex-col px-3 space-y-5">
                {navItems.map((item) => (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                {userRole === "librarian" && (
                  <Link
                    href="/add-library"
                    className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors"
                  >
                    Add Library
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className="text-lg font-medium text-gray-700 hover:text-yellow-600 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </nav>
              <div className="mt-auto pt-6 flex flex-col space-y-4">
                {user ? (
                  <LogOutButton onLogout={handleLogout} />
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                      asChild
                    >
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button
                      className="w-full bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm"
                      asChild
                    >
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}