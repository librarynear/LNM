"use client"
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { createClient } from '@/utils/supabase/client';
import { facilitiesList, librarySchema } from '@/zod/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getUserType } from '@/utils/supabase/getUserType';
import { User } from '@supabase/supabase-js';

const supabase = createClient();


export default function LibraryDetailsPage() {
  const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
    const getUser = async () => {
      const {type : userRole , data :user} = await getUserType();
      return { userRole, user };
    }
      getUser().then(({ user }) => {
        setUser(user);
      });
    }
    , []);
  const [libraryDetails, setLibraryDetails] = useState({
    libraryName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    googleMapLink: 'https://www.google.com/maps',
    totalSeats: '',
    openingTime: '',
    closingTime: '',
    whatsappNumber: '',
    feePerHour: '',
    feePerMonth: ''
  });
  // interface FormData_library {
  //   libraryName: string;
  //   address: string;
  //   city: string;
  //   state: string;
  //   pincode: string;
  //   googleMapLink: string;
  //   totalSeats: string;
  //   openingTime: string;
  //   closingTime: string;
  //   whatsappNumber: string;
  //   feePerHour: string;
  //   feePerMonth: string;
  // }
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState<FormData_library | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLibraryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos = Array.from(event.target.files);
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    }
  };

  const uploadPhoto = async (file: File) => {
    try {
      // Ensure user is authenticated

      // Validate file
      if (!file) {
        throw new Error('No file provided');
      }

      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = `librarians/${fileName}`;

      // Perform the upload
      const {  error } = await supabase.storage
        .from('library-photos')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type
        });

      // Check for upload errors
      if (error) {
        console.error('Detailed Upload Error:', error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('library-photos')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Photo Upload Catch Block Error:', error);
      throw error;
    }
  };

  // Modify the handleSubmit function in your LibraryDetailsPage.tsx file:

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);
  
    try {
      librarySchema.parse({
        ...libraryDetails,
        photos,
        selectedFacilities
      });
      let photosUrls: string[] = [];
      if (photos.length > 0) {
        try {
          photosUrls = await Promise.all(photos.map(photo => uploadPhoto(photo)));
        }
        catch (error) {
          console.error('Error uploading photos:', error);
          throw new Error('Photo upload failed');
        }
      }
      // Generate a UUID for the library
      const libraryId = uuidv4();
      
      // Insert the library with the explicit id
      const { error: libraryError } = await supabase
        .from('Library')
        .insert({
          id: libraryId,
          ...libraryDetails,
          photos: photosUrls,
          facilities: selectedFacilities,
          review_status: "pending",
          librarianId: user?.id
        });
        if(libraryError) {
          console.error('Error inserting library:', libraryError);  
          throw new Error('Library insertion failed');
        }
      
      toast.success('Library details submitted successfully!');
      router.push('/librarian/dashboard');
    }
    catch (error) {
      toast.error('Error submitting library details. Please try again.');
      console.error('Error:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const renderPhotoUploadSquares = () => {
    const totalSquares = 6;
    return Array.from({ length: totalSquares }).map((_, index) => (
      <div
        key={index}
        className="w-32 h-32 bg-gray-50 flex items-center justify-center relative"
      >
        {photos[index] ? (
          <img
            src={URL.createObjectURL(photos[index])}
            alt={`Uploaded ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Upload Photo</span>
        )}
        {index === photos.length && (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        )}
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl mt-10">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Library Basic Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block">Library Name</Label>
              <Input
                placeholder="Enter Library Name"
                className="w-full"
                name="libraryName"
                value={libraryDetails.libraryName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">Total Seats</Label>
              <Input
                type="number"
                placeholder="Number of Seats"
                className="w-full"
                name="totalSeats"
                value={libraryDetails.totalSeats}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* WhatsApp Number */}
          <div>
            <Label className="mb-2 block">WhatsApp Number</Label>
            <Input
              type="tel"
              placeholder="Enter WhatsApp Number"
              className="w-full"
              name="whatsappNumber"
              value={libraryDetails.whatsappNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Fees Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block">Fee per Hour (₹)</Label>
              <Input
                type="number"
                placeholder="Enter Fee per Hour"
                className="w-full"
                name="feePerHour"
                value={libraryDetails.feePerHour}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">Fee per Month (₹)</Label>
              <Input
                type="number"
                placeholder="Enter Fee per Month"
                className="w-full"
                name="feePerMonth"
                value={libraryDetails.feePerMonth}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Address Details */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="mb-2 block">City</Label>
              <Input
                placeholder="City"
                className="w-full"
                name="city"
                value={libraryDetails.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">State</Label>
              <Input
                placeholder="State"
                className="w-full"
                name="state"
                value={libraryDetails.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">Pincode</Label>
              <Input
                placeholder="Pincode"
                className="w-full"
                name="pincode"
                value={libraryDetails.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Full Address & Google Maps */}
          <div className="grid gap-4">
            <div>
              <Label className="mb-2 block">Full Address</Label>
              <Textarea
                placeholder="Enter Complete Address"
                className="w-full"
                value={libraryDetails.address}
                onChange={(e) => setLibraryDetails({ ...libraryDetails, address: e.target.value })}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">Google Maps Link</Label>
              <Input
                placeholder="Paste Google Maps URL"
                className="w-full"
                name="googleMapLink"
                value={libraryDetails.googleMapLink}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Timings */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label className="mb-2 block">Opening Time</Label>
                <Input
                  type="time"
                  className="w-full"
                  name="openingTime"
                  value={libraryDetails.openingTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex-1">
                <Label className="mb-2 block">Closing Time</Label>
                <Input
                  type="time"
                  className="w-full"
                  name="closingTime"
                  value={libraryDetails.closingTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Photo Uploads */}
          <div>
            <Label className="mb-2 block">Library Photos</Label>
            <div className="flex flex-wrap gap-4 mt-2">
              {renderPhotoUploadSquares()}
            </div>
          </div>

          {/* Facilities Section with Collapsible */}
          <div>
            <Label className="mb-2 block">Library Facilities</Label>
            <Collapsible
              open={isFacilitiesOpen}
              onOpenChange={setIsFacilitiesOpen}
              className="border rounded-md"
            >
              <CollapsibleTrigger className="w-full flex justify-between items-center p-3 hover:bg-gray-50">
                <span>
                  {selectedFacilities.length > 0
                    ? `${selectedFacilities.length} facilities selected`
                    : "Select Facilities"}
                </span>
                {isFacilitiesOpen ? <ChevronUp /> : <ChevronDown />}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4">
                <div className="grid md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {facilitiesList.map((facility) => (
                    <div
                      key={facility}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={facility}
                        checked={selectedFacilities.includes(facility)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFacilities(prev => [...prev, facility]);
                          } else {
                            setSelectedFacilities(prev =>
                              prev.filter(item => item !== facility)
                            );
                          }
                        }}
                        className="h-4 w-4"
                      />
                      <Label
                        htmlFor={facility}
                        className="text-sm font-normal"
                      >
                        {facility}
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button type="submit" className="w-full"
              disabled={loading}
            >
              {loading ?
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Processing...
              </>
              :
              "Submit Library Details"
              }
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}