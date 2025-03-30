import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, MapPin, Clock, Star, Bookmark, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { Library } from "@prisma/client"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import LibraryReviews from "@/components/library-reviews"
// import LibraryServices from "@/components/library-services"
// import LibraryGallery from "@/components/library-gallery"

// This would normally come from a database or API

const getLibraryData = async(id: string) => {
  const supabase = await createClient()
  const { data: libraryData, error: libraryError } = await supabase
    .from("Library")
    .select("*")
    .eq("id", id)
    .single()
  if (libraryError) {
    console.error("Error fetching library data:", libraryError)
    return null
  }
  if (!libraryData) {
    console.error("Library not found")
    return null
  }
  return libraryData
  // return {
  //   id,
  //   name: "Central Public Library",
  //   description:
  //     "The Central Public Library is a state-of-the-art facility offering a wide range of resources and services to the community. With spacious reading areas, modern technology, and an extensive collection of books and digital media, it serves as a hub for learning and community engagement.",
  //   location: "123 Main Street, New York, NY 10001",
  //   hours: {
  //     monday: "9:00 AM - 8:00 PM",
  //     tuesday: "9:00 AM - 8:00 PM",
  //     wednesday: "9:00 AM - 8:00 PM",
  //     thursday: "9:00 AM - 8:00 PM",
  //     friday: "9:00 AM - 6:00 PM",
  //     saturday: "10:00 AM - 5:00 PM",
  //     sunday: "12:00 PM - 5:00 PM",
  //   },
  //   rating: 4.8,
  //   reviewCount: 124,
  //   mainImage: "/placeholder.svg?height=600&width=1200",
  //   gallery: [
  //     "/placeholder.svg?height=400&width=600",
  //     "/placeholder.svg?height=400&width=600",
  //     "/placeholder.svg?height=400&width=600",
  //     "/placeholder.svg?height=400&width=600",
  //   ],
  //   services: [
  //     {
  //       name: "Research Support",
  //       description: "Professional assistance with research projects and academic inquiries",
  //     },
  //     { name: "Children's Programs", description: "Educational and entertaining programs for children of all ages" },
  //     { name: "Digital Resources", description: "Access to e-books, online databases, and digital archives" },
  //     { name: "Study Rooms", description: "Private and group study spaces available for reservation" },
  //     { name: "Computer Access", description: "Free computer and internet access for all patrons" },
  //     { name: "Printing Services", description: "Black and white and color printing available at affordable rates" },
  //   ],
  //   amenities: ["Free Wi-Fi", "Wheelchair Accessible", "Parking", "Café", "Restrooms", "Meeting Rooms"],
  // }
}
type tParams = Promise<{ slug: string[] }>;
export default async function LibraryPage(props: { params: tParams }) {
  const { slug } = await props.params;
   const id = slug[1];
   const library:Library = await getLibraryData(id)

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
        <Image
          src={library.photos[0] || "/placeholder.svg"}
          alt={library.libraryName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <Button variant="outline" size="sm" asChild className="mb-4 bg-white/90 hover:bg-white">
              <Link href="/">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Libraries
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{library.libraryName}</h1>
            <div className="flex items-center text-white mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{library.address}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white/90 text-black px-3 py-1 rounded-full">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">5</span>
                <span className="text-muted-foreground ml-1">(200 reviews)</span>
              </div>
              <Button size="sm" variant="secondary" className="gap-1">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              <Button size="sm" variant="secondary" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Library Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            

              

              
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Opening Hours
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday</span>
                  <span>{library.openingTime} - {library.closingTime}</span>
                </li>
                <li className="flex justify-between">
                  <span>Tuesday</span>
                  <span>{library.openingTime} - {library.closingTime}</span>
                </li>
                <li className="flex justify-between">
                  <span>Wednesday</span>
                  <span>{library.openingTime} - {library.closingTime}</span>
                </li>
                <li className="flex justify-between">
                  <span>Thursday</span>
                  <span>{library.openingTime} - {library.closingTime}</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday</span>
                  <span>{library.openingTime} - {library.closingTime}</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>{library.openingTime} - {library.closingTime}</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>{library.openingTime} - {library.closingTime}</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Schedule a Demo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Want to learn more about this library? Schedule a personalized tour with a librarian.
              </p>
              <Button className="w-full">Book a Demo</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

