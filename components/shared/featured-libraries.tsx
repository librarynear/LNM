"use client"
import Link from "next/link";
import { Star, MapPin } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Library } from "@prisma/client";

export default function FeaturedLibraries() {
  const [libraries, setLibraries] = useState<Library[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const fetchLibraries = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Library")
        .select("*")
        .eq("review_status", true)

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
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Featured Libraries</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Explore some of the most popular libraries in our network, each offering unique services and resources.
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p>Loading featured libraries...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Grid for featured libraries */}
        {!loading && !error && libraries?.length === 0 && (
          <div className="text-center py-8">
            <p>No libraries found.</p>
          </div>
        )}

        {!loading && !error && libraries && libraries.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {libraries.map((library) => (
              <Card
                key={library.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-48 w-full">
                  {/* Regular img tag instead of Next.js Image */}
                  <img
                    src={library.photos[0] || "/globe.svg"}
                    alt={library.libraryName}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl">{library.libraryName}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">
                        {library.feePerHour} / hr
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 mt-1 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{library.address}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {library.facilities?.map((service, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                  <Link
                    href={`/libraries/${library.id}`}
                    className="text-sm font-medium text-black hover:text-yellow-600"
                  >
                    View Details →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}