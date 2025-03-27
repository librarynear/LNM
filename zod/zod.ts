import { z } from "zod";

export const librarianSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  contactNumber: z.string().regex(/^\d{10}$/, "Contact number must be 10 digits"),
  profilePhoto: z.instanceof(File).optional(),
});
