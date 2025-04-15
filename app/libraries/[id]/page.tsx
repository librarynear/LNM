"use server"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, MapPin, Clock, Star, Bookmark, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import } from "@prisma/client"

// This would normally come from a database or API
const getLibraryData = async(id: string) => {
  try {
    const supabase = await createClient()
    const { data: libraryData, error: libraryError } = await supabase
      .from("Library")
      .select("*, LibraryPlan(*)")
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
  } catch (error) {
    console.error("Error in getLibraryData:", error)
    return null
  }
}

type Params = { id: string };
export default async function LibraryPage(props: { params: Promise<Params> }) {
  const { id } = await props.params;
  const library = await getLibraryData(id);

  if (!library) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Library Not Found</h1>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
        <Image
          src={library.photos && library.photos.length > 0 ? library.photos[0] : "/placeholder.svg"}
          alt={library.libraryName || "Library"}
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{library.libraryName || "Library"}</h1>
            <div className="flex items-center text-white mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{library.address || "Address not available"}</span>
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
            {/* Library Plans Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Monthly Fee</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {library.LibraryPlan && library.LibraryPlan.length > 0 ? (
                      library.LibraryPlan.map((plan:LibraryPlan) => (
                        <TableRow key={plan.id}>
                          <TableCell className="font-medium">{plan.planType}</TableCell>
                          <TableCell>{plan.hours}</TableCell>
                          <TableCell>{plan.monthlyFee}</TableCell>
                          <TableCell>{plan.description || "—"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          No plans available for this library
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Facilities Table */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Facilities</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Available Facilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {library.facilities && library.facilities.length > 0 ? (
                      library.facilities.map((facility:string, index:number) => (
                        <TableRow key={index}>
                          <TableCell>{facility}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="text-center py-4 text-muted-foreground">
                          No facilities information available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* Additional Library Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Library Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Total Seats</h3>
                  <p>{library.totalSeats || "Not specified"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <p>{library.whatsappNumber || "Not available"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p>{library.city}, {library.state} - {library.pincode}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Map</h3>
                  {library.googleMapLink ? (
                    <Button variant="outline" size="sm" asChild>
                      <a href={library.googleMapLink} target="_blank" rel="noopener noreferrer">
                        View on Google Maps
                      </a>
                    </Button>
                  ) : (
                    <p>Map link not available</p>
                  )}
                </div>
              </div>
            </div>
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
                  <span>{library.openingTime || "N/A"} - {library.closingTime || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Tuesday</span>
                  <span>{library.openingTime || "N/A"} - {library.closingTime || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Wednesday</span>
                  <span>{library.openingTime || "N/A"} - {library.closingTime || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Thursday</span>
                  <span>{library.openingTime || "N/A"} - {library.closingTime || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday</span>
                  <span>{library.openingTime || "N/A"} - {library.closingTime || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>{library.openingTime || "N/A"} - {library.closingTime || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>{library.openingTime || "N/A"} - {library.closingTime || "N/A"}</span>
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
