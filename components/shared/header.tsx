"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 font-sans w-full py-5 px-2 backdrop-blur-2xl z-10 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/">Library Near</Link>

        <nav className={`md:flex ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row">
            <li className="p-2">
              <Link href="#home">Home</Link>
            </li>
            <li className="p-2">
              <Link href="#about">About</Link>
            </li>
            <li className="p-2">
              <Link href="#services">Services</Link>
            </li>
            <li className="p-2">
              <Link href="#contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
