"use client"
import { MapPin, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [location, setLocation] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  // Handle search submission
  const handleSearch = () => {
    // Navigate to the libraries page with the search query
    if (location.trim() !== '') {
      router.push(`/libraries?search=${encodeURIComponent(location)}`);
    } else {
      router.push('/libraries');
    }
  };

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle quick access button clicks
  const handleQuickAccessClick = (filter: string) => {
    switch(filter) {
      case 'popular':
        router.push('/libraries?sort=popular');
        break;
      case 'area':
        // Get user's geolocation and navigate
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              router.push(`/libraries?lat=${latitude}&lng=${longitude}`);
            },
            () => {
              // If user denies location access or any error occurs
              router.push('/libraries?nearby=true');
            }
          );
        } else {
          router.push('/libraries');
        }
        break;
      case 'events':
        router.push('/events');
        break;
      default:
        router.push('/libraries');
    }
  };

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
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-0">
          <h1 className="mb-4 sm:mb-6 text-4xl sm:text-5xl font-bold text-white md:text-7xl px-2">
            Find Your Perfect <span className="text-yellow-400">Library</span> Experience
          </h1>
          <p className="mb-6 sm:mb-10 text-lg sm:text-xl text-gray-200 md:text-2xl max-w-3xl mx-auto px-3 sm:px-4">
            Discover libraries near you, explore their collections, and connect with your community knowledge hub.
          </p>

          {/* Search Box */}
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-0">
            <div className="relative w-full max-w-4xl mx-auto flex justify-center">
              <div className="relative w-full sm:w-[90%] md:w-[80%]">
                <MapPin className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter library name or location to search"
                  className="w-full rounded-3xl border-2 border-yellow-400/70 bg-white/90 py-3 sm:py-4 pl-10 sm:pl-14 pr-16 sm:pr-20 text-base sm:text-lg shadow-lg focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/30 transition-all duration-300"
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1.5 sm:py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-colors duration-300 flex items-center"
                >
                  <Search className="h-4 w-4 mr-1 sm:mr-2" />
                  Search
                </button>
              </div>
            </div>

            {/* Quick Access Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2 sm:mt-4 px-1">
              <button 
                onClick={() => handleQuickAccessClick('popular')}
                className="bg-white/20 hover:bg-white/30 text-white py-1.5 sm:py-2 px-4 sm:px-6 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30 text-sm sm:text-base whitespace-nowrap"
              >
                Popular Libraries
              </button>
              <button 
                onClick={() => handleQuickAccessClick('area')}
                className="bg-white/20 hover:bg-white/30 text-white py-1.5 sm:py-2 px-4 sm:px-6 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30 text-sm sm:text-base whitespace-nowrap"
              >
                Find in your area
              </button>
              <button 
                onClick={() => handleQuickAccessClick('events')}
                className="bg-white/20 hover:bg-white/30 text-white py-1.5 sm:py-2 px-4 sm:px-6 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30 text-sm sm:text-base whitespace-nowrap"
              >
                Events & Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}