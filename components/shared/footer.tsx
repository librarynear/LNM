import Link from "next/link";
import { Icons } from "@/public/icons/icons";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 py-8">
      <div className="container mx-auto px-28 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us Column */}
          <div>
            <h3 className="text-amber-500 font-semibold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about/our-story" className="hover:text-amber-400 transition-colors">Our Story</Link></li>
              <li><Link href="/about/team" className="hover:text-amber-400 transition-colors">Team</Link></li>
              <li><Link href="/careers" className="hover:text-amber-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Collections Column */}
          <div>
            <h3 className="text-amber-500 font-semibold text-lg mb-4">Collections</h3>
            <ul className="space-y-2">
              <li><Link href="/collections/new-arrivals" className="hover:text-amber-400 transition-colors">New Arrivals</Link></li>
              <li><Link href="/collections/fiction" className="hover:text-amber-400 transition-colors">Fiction Books</Link></li>
              <li><Link href="/collections/non-fiction" className="hover:text-amber-400 transition-colors">Non-Fiction</Link></li>
              <li><Link href="/collections/rare" className="hover:text-amber-400 transition-colors">Rare Editions</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-amber-500 font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/membership" className="hover:text-amber-400 transition-colors">Membership</Link></li>
              <li><Link href="/services/reading-rooms" className="hover:text-amber-400 transition-colors">Reading Rooms</Link></li>
              <li><Link href="/services/events" className="hover:text-amber-400 transition-colors">Events & Workshops</Link></li>
              <li><Link href="/services/research" className="hover:text-amber-400 transition-colors">Research Assistance</Link></li>
              <li><Link href="/services/digital" className="hover:text-amber-400 transition-colors">Digital Library</Link></li>
            </ul>
          </div>

          {/* Tools Column */}
          <div>
            <h3 className="text-amber-500 font-semibold text-lg mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><Link href="/tools/catalog-search" className="hover:text-amber-400 transition-colors">Catalog Search</Link></li>
              <li><Link href="/tools/reading-list" className="hover:text-amber-400 transition-colors">Reading List Creator</Link></li>
              <li><Link href="/tools/citation" className="hover:text-amber-400 transition-colors">Citation Generator</Link></li>
              <li><Link href="/tools/reservation" className="hover:text-amber-400 transition-colors">Book Reservation</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 border-t border-slate-800 pt-8 grid grid-cols-1 md:grid-cols-1 gap-8">
          <div>
            <h3 className="text-amber-500 font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Icons.mapPin className="h-5 w-5 mt-0.5 text-slate-400" />
                <span>123 Library Avenue, Knowledge District, Booktown, BK 10101</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.mail className="h-5 w-5 text-slate-400" />
                <a href="mailto:contact@libraryapp.com" className="hover:text-amber-400 transition-colors">contact@libraryapp.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Icons.phone className="h-5 w-5 text-slate-400" />
                <a href="tel:+11234567890" className="hover:text-amber-400 transition-colors">+1 (123) 456-7890</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-amber-500 font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Icons.youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Icons.instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Icons.whatsapp className="h-6 w-6" />
                <span className="sr-only">WhatsApp</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Icons.linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">Copyright © 2025 <span className="text-amber-500 font-medium">library</span>app. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">Terms of Use</Link>
            <Link href="/accessibility" className="text-sm text-slate-400 hover:text-amber-400 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
