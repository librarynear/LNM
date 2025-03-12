"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        <Link href="/" className="text-sm font-medium hover:text-yellow-500 transition-colors">
          Home
        </Link>
        <Link href="/about" className="text-sm font-medium hover:text-yellow-500 transition-colors">
          About Us
        </Link>
        <Link href="/contact" className="text-sm font-medium hover:text-yellow-500 transition-colors">
          Contact
        </Link>
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
          Log In
        </Button>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Sign Up</Button>
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
              <Link href="/" className="text-lg font-medium hover:text-yellow-500 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-lg font-medium hover:text-yellow-500 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-lg font-medium hover:text-yellow-500 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="mt-auto pt-6 flex flex-col space-y-4">
              <Button
                variant="outline"
                className="w-full border-black text-black hover:bg-black hover:text-white"
              >
                Log In
              </Button>
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">Sign Up</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </header>
  );
}
