"use client"
import { MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function HeroSection() {
  const [location, setLocation] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to adjust input width based on content
  const adjustInputSize = () => {
    //   if (inputRef.current) {
    // const minWidth = 400; // Minimum width in pixels
    //     const contentLength = location.length;
    //     // Add extra space for better visual appearance
    //     const newWidth = Math.max(minWidth, (contentLength * 14) + 60);
    //     inputRef.current.style.width = `${newWidth}px`;
    //   }
  };

  // Adjust input size when location changes
  useEffect(() => {
    adjustInputSize();
  }, [location]);

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/library.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
            Find Your Perfect <span className="text-yellow-400">Library</span> Experience
          </h1>
          <p className="mb-10 text-xl text-gray-200 md:text-2xl max-w-3xl mx-auto">
            Discover libraries near you, explore their collections, and connect with your community knowledge hub.
          </p>

          {/* Search Box */}
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-full max-w-4xl mx-auto flex justify-center">
              <div className="relative w-[80%]">
                <MapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-yellow-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location to find nearby libraries"
                  className="w-full rounded-3xl border-2 border-yellow-400/70 bg-white/90 py-4 pl-14 pr-20 text-lg shadow-lg focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/30 transition-all duration-300"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Access Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-6 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30">
                Popular Libraries
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-6 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30">
                Find in your area
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-6 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30">
                Events & Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}