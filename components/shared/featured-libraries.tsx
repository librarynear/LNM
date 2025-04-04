"use client"
import Link from "next/link";
import { Star, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/client";
import { Library } from "@prisma/client";

export default function FeaturedLibraries() {
  const [libraries, setLibraries] = useState<Library[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const supabase = createClient();
    const fetchLibraries = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Library")
        .select("*")
        .eq("review_status", "approved")

      if (error) {
        console.error("Error fetching libraries:", error);
        setError("Failed to load libraries");
      } else {
        console.log("Featured Libraries:", data);
        setLibraries(data);
      }
      setLoading(false);
    };
    fetchLibraries();

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight relative inline-block">
            Featured Libraries
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-yellow-400 rounded-full"></span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 mt-6 text-lg">
            Discover carefully curated libraries tailored to match your study and research needs.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured libraries...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">
            <p className="font-medium">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Slider for featured libraries */}
        {!loading && !error && libraries?.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-600">No libraries found at the moment.</p>
          </div>
        )}

        {!loading && !error && libraries && libraries.length > 0 && (
          <div className="relative">
            <div className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2">
              <button 
                ref={prevRef}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              onInit={(swiper) => {
                //@ts-expect-error : Swiper's type definitions may not include all properties
                swiper.params.navigation.prevEl = prevRef.current;
                //@ts-expect-error : Swiper's type definitions may not include all properties
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              className="pb-12"
            >
              {libraries.map((library) => (
                <SwiperSlide key={library.id}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 rounded-xl h-full">
                    <div className="relative h-56 w-full group">
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                      <img
                        src={library.photos[0] || "/globe.svg"}
                        alt={library.libraryName}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-yellow-500 text-white border-0 px-3 py-1 text-xs font-semibold">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-xl text-gray-800">{library.libraryName}</h3>
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                          <span className="text-sm font-semibold text-yellow-700">
                            ₹{library.feePerHour}/hr
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm truncate">{library.address}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {library.facilities?.slice(0, 3).map((service, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-gray-50 text-gray-700 border-gray-200 px-3 py-1"
                          >
                            {service}
                          </Badge>
                        ))}
                        {library.facilities?.length > 3 && (
                          <Badge
                            variant="outline"
                            className="bg-gray-50 text-gray-700 border-gray-200 px-3 py-1"
                          >
                            +{library.facilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="bg-gray-50 p-4 border-t border-gray-100 mt-auto">
                      <Link
                        href={`/libraries/${library.id}`}
                        className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 px-4 rounded-lg transition-colors font-medium"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2">
              <button 
                ref={nextRef}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        )}
        
        {!loading && !error && libraries && libraries.length > 0 && (
          <div className="mt-12 text-center">
            <Link 
              href="/libraries" 
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
            >
              View All Libraries
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
