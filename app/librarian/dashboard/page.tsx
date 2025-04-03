"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Library, BookOpen, CheckCircle, Clock } from "lucide-react";
import ProtectedRoute from "@/context/ProtectedRouteContext";
import { toast } from "sonner";

const supabase = createClient();

export default function LibrarianDashboard() {
  interface Librarian {
    id: string;
    username: string;
    email: string;
    profilePhoto: string;
  }
  interface Library {
    id: string;
    libraryName: string;
    address: string;
    review_status: "pending" | "approved" | "rejected";
    photos?: string[];
  }
  const [librarian, setLibrarian] = useState<Librarian | null>(null);
  const [libraries, setLibraries] = useState<Library[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrarianData = async () => {
      setLoading(true);
      const user = await supabase.auth.getUser();
      if (!user || !user.data.user) {
        setLoading(false);
        return;
      }

      const { data: librarianData, error: librarianError } = await supabase
        .from("Librarian")
        .select("id, username, email, profilePhoto")
        .eq("id", user.data.user.id)
        .single();

      if (librarianError) {
        console.error("Error fetching librarian:", librarianError);
        setLoading(false);
        return;
      }

      setLibrarian(librarianData);

      const { data: libraryData, error: libraryError } = await supabase
        .from("Library")
        .select("id, libraryName, address, review_status, photos")
        .eq("librarianId", librarianData.id);

      if (libraryError) {
        console.error("Error fetching libraries:", libraryError);
        setLoading(false);
        return;
      }

      setLibraries(libraryData);
      setLoading(false);
    };

    fetchLibrarianData();
  }, []);

  const reviewedCount = libraries?.filter(lib => lib.review_status).length || 0;
  const pendingCount = libraries?.length ? libraries.length - reviewedCount : 0;

  const handleDelete = async (id:string) => {
    try {
      const { error } = await supabase
        .from("library")
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error deleting library:', error.message);
        return;
      }
      setLibraries((prevLibraries)=> {
        if(prevLibraries) prevLibraries.filter(library => library.id !== id)
        return prevLibraries
    });
    }
    catch (error) {
      console.error('Error in delete operation:', error)
      toast.error("Failed to delete library");
    }

  }
  return (
    <ProtectedRoute requiredRole="librarian">
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="mt-28 ">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Librarian Dashboard</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-8">
          {/* Librarian Profile Card */}
          {librarian && (
            <Card className="mb-6 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                    <AvatarImage src={librarian.profilePhoto} alt={librarian.username} />
                    <AvatarFallback className="text-xl bg-blue-500 text-white">
                      {librarian.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{librarian.username}</h2>
                    <p className="text-gray-500 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {librarian.email}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Libraries</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{libraries?.length || 0}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Library className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Reviewed</p>
                    <h3 className="text-3xl font-bold text-green-600 mt-1">{reviewedCount}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Pending Review</p>
                    <h3 className="text-3xl font-bold text-amber-500 mt-1">{pendingCount}</h3>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Libraries Table Card */}
          <Card className="shadow-lg mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Your Libraries
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading libraries...</div>
              ) : libraries?.length ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-24">Photo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {libraries.map((library) => (
                        <TableRow key={library.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell>
                            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                              <img
                                src={library.photos?.[0] || "/placeholder.jpg"}
                                alt={library.libraryName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{library.libraryName}</TableCell>
                          <TableCell className="text-gray-600 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {library.address}
                          </TableCell>
                          <TableCell className="text-right">
                            {library.review_status === "approved" ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
                            ) : library.review_status === "pending" ? (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>
                            ) : library.review_status === "rejected" ? (
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Unknown</Badge>
                            )}
                          </TableCell>

                          <TableCell className="text-right">
                            <Badge className="bg-amber-100 text-red-600 hover:bg-amber-200" onClick={() => handleDelete(library.id)}>Delete</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No libraries found. Add your first library to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}