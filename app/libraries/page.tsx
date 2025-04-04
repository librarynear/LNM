"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, MapPin, ArrowRight, Search, Filter } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Library } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AllLibrariesPage() {
  const [libraries, setLibraries] = useState<Library[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    maxFee: "",
    facility: "",
  });
  
  useEffect(() => {
    const fetchAllLibraries = async () => {
      setLoading(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
          .from("Library")
          .select("*")
          .eq("review_status", "approved");
          
        if (error) {
          console.error("Error fetching libraries:", error);
          setError("Failed to load libraries");
        } else {
          console.log("All Libraries:", data);
          setLibraries(data);
        }
      } catch (err) {
        console.error("Exception fetching libraries:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllLibraries();
  }, []);
  
  // Filter libraries based on search term and filters
  const filteredLibraries = libraries ? libraries.filter(library => {
    // Search term filter
    const matchesSearch = 
      !searchTerm || 
      library.libraryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      library.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Max fee filter
    const matchesFee = 
      !filters.maxFee || 
      library.feePerHour <= parseFloat(filters.maxFee);
    
    // Facility filter
    const matchesFacility = 
      !filters.facility || 
      (library.facilities && 
       library.facilities.some(facility => 
         facility.toLowerCase().includes(filters.facility.toLowerCase())
       ));
    
    return matchesSearch && matchesFee && matchesFacility;
  }) : [];
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yellow-500 to-yellow-600 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover Libraries Near You</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Find the perfect study space, explore collections, and connect with your community knowledge hubs.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by library name or location"
                className="pl-10 py-6 rounded-lg w-full bg-white/95 text-gray-800 border-0 shadow-lg focus-visible:ring-2 focus-visible:ring-yellow-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="py-8 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Max Fee (₹/hr):</span>
                <Input
                  type="number"
                  name="maxFee"
                  placeholder="Max fee"
                  className="w-24 h-9"
                  value={filters.maxFee}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Facility:</span>
                <Input
                  type="text"
                  name="facility"
                  placeholder="e.g. WiFi, AC"
                  className="w-36 h-9"
                  value={filters.facility}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              {`${filteredLibraries.length} libraries found`}
            </div>
          </div>
        </div>
      </section>
      
      {/* Libraries Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading libraries...</p>
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
          
          {!loading && !error && filteredLibraries.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-600">No libraries found matching your criteria.</p>
              <button 
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                onClick={() => {
                  setSearchTerm("");
                  setFilters({ maxFee: "", facility: "" });
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
          
          {!loading && !error && filteredLibraries.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLibraries.map((library) => (
                <Card key={library.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl border-0 rounded-xl h-full flex flex-col">
                  <div className="relative h-48 w-full group">
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    <img
                      src={library.photos[0] || "/globe.svg"}
                      alt={library.libraryName}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <CardContent className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-gray-800">{library.libraryName}</h3>
                      <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                        <span className="text-sm font-semibold text-yellow-700">
                          ₹{library.feePerHour}/hr
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="text-sm truncate">{library.address}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {library.facilities?.slice(0, 3).map((service, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-50 text-gray-700 border-gray-200 px-2 py-0.5 text-xs"
                        >
                          {service}
                        </Badge>
                      ))}
                      {library.facilities?.length > 3 && (
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-700 border-gray-200 px-2 py-0.5 text-xs"
                        >
                          +{library.facilities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 p-4 border-t border-gray-100">
                    <Link
                      href={`/libraries/${library.id}`}
                      className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {/* Pagination placeholder - You can implement actual pagination later */}
          {!loading && !error && filteredLibraries.length > 0 && filteredLibraries.length > 12 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}