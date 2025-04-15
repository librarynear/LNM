import Link from "next/link";
import { Icons } from "@/public/icons/icons";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Brand and Social Icons Column */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-6">Library Near</h2>
            <div className="flex space-x-4">
              <a href="https://whatsapp.com/channel/0029VbAI33ZGehEDpK1GHW27 " aria-label="Whatsapp Channel" className="text-gray-500 hover:text-gray-700">
                <Icons.whatsapp className="h-6 w-6" />
              </a>
              <a href="https://x.com/@Librarynear_com" aria-label="Twitter" className="text-gray-500 hover:text-gray-700">
                <Icons.twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-700">
                <Icons.linkedin className="h-6 w-6" />
              </a>
              <a href="https://youtube.com/@librarynear?si=obiWCjTPtqnJOhUM 
" aria-label="YouTube" className="text-gray-500 hover:text-gray-700">
                <Icons.youtube className="h-6 w-6" />
              </a>
              {/* <a href="https://www.instagram.com/librarynear" aria-label="Instagram" className="text-gray-500 hover:text-gray-700">
                <Icons.instagram className="h-6 w-6" />
              </a> */}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First Column */}
            <div>
              <h3 className="font-medium mb-4">Home</h3>
              <ul className="space-y-2">
                <li><Link href="/wishlist" className="text-gray-600 hover:text-gray-900">Wishlist</Link></li>
                <li><Link href="/highlights" className="text-gray-600 hover:text-gray-900">Highlights</Link></li>
                <li><Link href="/map" className="text-gray-600 hover:text-gray-900">Map</Link></li>
              </ul>
            </div>

            {/* Second Column */}
            <div>
              <h3 className="font-medium mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/how-it-work" className="text-gray-600 hover:text-gray-900">How it work</Link></li>
                <li><Link href="/our-mission" className="text-gray-600 hover:text-gray-900">Our Mission</Link></li>
                <li><Link href="/page" className="text-gray-600 hover:text-gray-900">Page</Link></li>
              </ul>
            </div>

            {/* Third Column */}
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Delhi, India</li>
                <li><a href="mailto:librarynear@gmail.com" className="text-gray-600 hover:text-gray-900">librarynear@gmail.com</a></li>
                <li><a href="tel:+919354610893" className="text-gray-600 hover:text-gray-900">9354610893</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
