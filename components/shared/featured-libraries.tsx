import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for featured libraries
const featuredLibraries = [
  {
    id: "1",
    name: "Central Public Library",
    image: "/placeholder.svg?height=300&width=400",
    location: "New York, NY",
    rating: 4.8,
    services: ["Research Support", "Children's Programs", "Digital Resources"],
  },
  {
    id: "2",
    name: "Westside Community Library",
    image: "/placeholder.svg?height=300&width=400",
    location: "Los Angeles, CA",
    rating: 4.6,
    services: ["Study Rooms", "Computer Access", "Book Clubs"],
  },
  {
    id: "3",
    name: "Lakefront Library Center",
    image: "/placeholder.svg?height=300&width=400",
    location: "Chicago, IL",
    rating: 4.7,
    services: ["Maker Space", "Language Classes", "Audio Books"],
  },
];

export default function FeaturedLibraries() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 ">
      <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Featured Libraries</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Explore some of the most popular libraries in our network, each offering unique services and resources.
            </p>
          </div>
        {/* Grid for featured libraries */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredLibraries.map((library) => (
            <Card
              key={library.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={library.image || "/placeholder.svg"}
                  alt={library.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl">{library.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {library.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 mt-1 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{library.location}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {library.services.map((service, index) => (
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
      </div>
    </section>
  );
}
