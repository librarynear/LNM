export interface Student {
  id: string;
  username?: string | null;
  email: string;
  password?: string | null;
  profileCompleted: boolean;
  role: string;
  createdAt: Date;
}

export interface Librarian {
  id: string;
  username: string;
  email: string;
  password?: string | null;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  address?: string | null;
  profileCompleted: boolean;
  provider: string;
  role: string;
  createdAt: Date;
  libraries?: Library[];
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

export interface LibraryPlan {
  id: string;
  hours: string;
  monthlyFee: string;
  planType: string;
  description?: string | null;
  libraryId: string;
  library?: Library;
}

export interface Library {
  id: string;
  libraryName: string;
  address: string;
  city: string;
  state: string;
  pincode: number;
  googleMapLink?: string | null;
  photos: string[];
  totalSeats: number;
  openingTime: string;
  closingTime: string;
  whatsappNumber?: string | null;
  plans?: LibraryPlan[];
  facilities: string[];
  review_status: string;
  createdAt: Date;
  librarianId: string;
  librarian?: Librarian;
}