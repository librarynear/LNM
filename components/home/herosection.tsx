import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "../ui/button";


export default function HeroSection() {
    return (
        <section className="relative h-[40rem] flex items-center  justify-center bg-black/40 py-20 md:py-28">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              Find Your Perfect <span className="text-yellow-400">Library</span> Experience
            </h1>
            <p className="mb-8 text-lg text-gray-300 md:text-xl">
              Discover libraries near you, explore their services, and connect with your community's knowledge hub.
            </p>
            <div className="flex  items-center justify-center gap-4 flex-row">
            <div className="">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                />
              </div>
        
            </div>
            </div>
          </div>
        </div>
    </section>
    );
}