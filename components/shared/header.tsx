"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import LogOutButton from "./LogOutButton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { user, userRole } = useAuth();
  const [toggle, setToggle] = useState(true);
  // Navigation items to avoid repetition
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" }
  ];
    const router = useRouter();
  function handleLogout(){
    router.push("/login")
    
  }

  return (
    <header className="border-b fixed top-0 w-full backdrop-blur-2xl z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-40">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tj1eTru6ptXyXV3BkNAQxnyhtqzuMp.png"
              alt="LibraryNear.com Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <Link 
              key={item.href}
              href={item.href} 
              className="text-sm font-medium hover:text-yellow-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {userRole === "librarian" && (
            <Link href="/add-library" className="text-sm font-medium hover:text-yellow-500 transition-colors mr-10">
              Add Library
            </Link>
          )}
          {userRole === "admin" && (
            <Link href="/admin/dashboard" className="text-sm font-medium hover:text-yellow-500 transition-colors mr-10">
              Admin Dashboard
            </Link>
          )}
          {user ? (
            <LogOutButton onLogout={handleLogout} />
          ) : (
            <>
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white" asChild>
                <Link href="/login" className="hidden sm:block">Log In</Link>
              </Button>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-10 w-10" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center">
                  <div className="relative h-8 w-32">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tj1eTru6ptXyXV3BkNAQxnyhtqzuMp.png"
                      alt="LibraryNear.com Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
              </div>
              <nav className="flex flex-col px-3 space-y-6">
                {navItems.map(item => (
                  <Link 
                    key={`mobile-${item.href}`}
                    href={item.href} 
                    className="text-lg font-medium hover:text-yellow-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                
                {userRole === "librarian" && (
                  <Link href="/add-library" className="text-lg font-medium hover:text-yellow-500 transition-colors">
                    Add Library
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link href="/admin/dashboard" className="text-lg font-medium hover:text-yellow-500 transition-colors">
                    Admin Dashboard
                  </Link>
                )}
              </nav>
              <div className="mt-auto pt-6 flex flex-col space-y-4">
                {user ? (
                  <LogOutButton />
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full border-black text-black hover:bg-black hover:text-white"
                      asChild
                    >
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500" asChild>
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