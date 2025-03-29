"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Phone } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Define the Library type
interface Library {
  id: string;
  libraryName: string;
  address: string;
  photos: string[];
  whatsappNumber: string;
  review_status: boolean;
  facilities: string[];
  feePerHour: number;
  librarianId: string;
}

export default function AdminDashboard() {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Fetch libraries that need approval (review_status = false)
  const fetchPendingLibraries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Library")
        .select("*")
        .eq("review_status", false);

      if (error) {
        throw error;
      }

      setLibraries(data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error approving library:", err.message);
        alert("Failed to approve library: " + err.message);
      setError(err.message || "Failed to load libraries");}
      else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Approve library
  const approveLibrary = async (libraryId: string) => {
    try {
      const { error } = await supabase
        .from("Library")
        .update({ review_status: true })
        .eq("id", libraryId);

      if (error) {
        throw error;
      }

      // Remove the approved library from the list
      setLibraries(libraries.filter(lib => lib.id !== libraryId));
    } catch (err) {
      console.error("Error approving library:", err);
      alert("Failed to approve library: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPendingLibraries();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-2xl">Welcome, Admin</CardTitle>
            <CardDescription>
              Manage library approvals and updates from this dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Pending Library Approvals</h2>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                {libraries.length} Libraries Pending
              </Badge>
            </div>

            {loading && (
              <div className="text-center py-10">
                <p className="text-gray-500">Loading libraries...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => fetchPendingLibraries()}
                >
                  Try Again
                </Button>
              </div>
            )}

            {!loading && !error && libraries.length === 0 && (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <h3 className="text-gray-500 font-medium">All caught up!</h3>
                <p className="text-gray-400">There are no libraries pending approval</p>
              </div>
            )}

            {!loading && !error && libraries.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Photo</TableHead>
                      <TableHead>Library Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Fee/Hour</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {libraries.map((library) => (
                      <TableRow key={library.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <img
                              src={library.photos[0] || "/placeholder.jpg"}
                              alt={library.libraryName}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.jpg";
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{library.libraryName}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{library.address}</TableCell>
                        <TableCell>
                          <a
                            href={`https://wa.me/${library.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-green-600 hover:text-green-700"
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            {library.whatsappNumber}
                          </a>
                        </TableCell>
                        <TableCell>${library.feePerHour}/hr</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                              onClick={() => approveLibrary(library.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
