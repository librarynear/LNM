"use client";
import React, { useState, useRef, ChangeEvent, FormEvent, JSX } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation'; // Update import
import { librarianSchema } from '@/zod/zod';
import { z } from 'zod';

interface FormData {
  username: string;
  email: string;
  contactNumber: string;
  address: string;
}

const supabase = createClient();

export default function LibrarianOnboarding({user}:{user : {
    email : string,
    username : string
} | null}): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    username: `${user?.username || 'username'}`,
    email: `${user?.email || 'email'}`,
    contactNumber: '',
    address: ''
  });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Add this hook

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePhoto(file);
  };

  const handleProfilePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const uploadPhoto = async (file: File) => {
    try {
      // Ensure user is authenticated
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('User must be authenticated to upload');
      }
  
      // Validate file
      if (!file) {
        throw new Error('No file provided');
      }
  
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `librarians/${fileName}`;
  
      // Perform the upload
      const { data, error } = await supabase.storage
        .from('librarian-profilephoto')
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
        .from('librarian-profilephoto')
        .getPublicUrl(filePath);
  
      return publicUrl;
    } catch (error) {
      console.error('Photo Upload Catch Block Error:', error);
      throw error;
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
  
    try {
      // Zod validation
      librarianSchema.parse(formData);
  
      // Get authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('User must be authenticated');
      }
  
      // Handle photo upload if a photo is selected
      let photoUrl = null;
      if (profilePhoto) {
        try {
          photoUrl = await uploadPhoto(profilePhoto);
        } catch (uploadError) {
          // Handle specific upload errors
          setErrors(prev => ({
            ...prev,
            profilePhoto: 'Failed to upload profile photo. Please try again.'
          }));
          throw uploadError;
        }
      }
  
      // Update Librarian profile
      const { error: updateError } = await supabase
        .from('Librarian')
        .update({ 
          ...formData, 
          profilePhoto: photoUrl, 
          profileCompleted: true 
        })
        .eq('id', user.id);
  
      if (updateError) {
        console.error('Profile Update Error:', updateError);
        throw updateError;
      }
  
      router.push('/');
    } catch (err) {
      // Handle Zod validation errors
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(formattedErrors);
      } else {
        // Generic error handling
        setErrors(prev => ({
          ...prev,
          general: err instanceof Error ? err.message : 'An unexpected error occurred'
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClassName = (name: string): string => `
    w-full 
    px-4 
    py-3 
    border 
    rounded-lg 
    outline-none 
    transition-all 
    duration-300 
    text-base
    ${focusedField === name 
      ? 'border-blue-500 ring-2 ring-blue-200' 
      : 'border-gray-300 hover:border-gray-400'}
  `;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <Card className="w-full max-w-4xl shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Profile Photo Section */}
          <div className="w-1/3 bg-blue-50 p-8 flex flex-col items-center justify-center">
            <div 
              onClick={handleProfilePhotoClick}
              className="
                relative 
                w-64 
                h-64 
                border-4 
                border-dashed 
                border-blue-300 
                rounded-2xl 
                flex 
                items-center 
                justify-center 
                cursor-pointer 
                hover:border-blue-500 
                transition-colors 
                group
                overflow-hidden
                shadow-lg
              "
            >
              {profilePhoto ? (
                <img 
                  src={URL.createObjectURL(profilePhoto)} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <User className="w-20 h-20 text-blue-400 group-hover:text-blue-600 mb-4" />
                  <span className="text-blue-500 font-semibold group-hover:text-blue-700">
                    Upload Profile Photo
                  </span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                required
              />
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
              Click to upload a professional photo
            </p>
          </div>

          {/* Form Section */}
          <div className="w-2/3 p-8">
            <CardHeader className="mb-6">
              <CardTitle className="text-4xl font-bold text-blue-800 mb-2">
                Librarian Onboarding
              </CardTitle>
              <p className="text-gray-600">
                Complete your professional profile
              </p>
            </CardHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Username and Email in first row */}
                <div>
                  <Label 
                    htmlFor="username" 
                    className="text-gray-700 capitalize mb-2 block font-medium"
                  >
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    required
                    readOnly
                    className={`${inputClassName('username')} bg-gray-100 cursor-not-allowed`}
                  />
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <Label 
                    htmlFor="email" 
                    className="text-gray-700 capitalize mb-2 block font-medium"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    readOnly
                    className={`${inputClassName('email')} bg-gray-100 cursor-not-allowed`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Contact Number and Address in full width row */}
                <div className="col-span-2">
                  <Label 
                    htmlFor="contactNumber" 
                    className="text-gray-700 capitalize mb-2 block font-medium"
                  >
                    Contact Number
                  </Label>
                  <Input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('contactNumber')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={inputClassName('contactNumber')}
                    placeholder="Enter your contact number"
                  />
                  {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
                </div>

                <div className="col-span-2">
                  <Label 
                    htmlFor="address" 
                    className="text-gray-700 capitalize mb-2 block font-medium"
                  >
                    Address
                  </Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={inputClassName('address')}
                    placeholder="Enter your full address"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3.5 rounded-lg text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-3" size={24} />
                    Processing...
                  </>
                ) : (
                  "Complete Onboarding"
                )}
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}