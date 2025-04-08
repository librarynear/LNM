import { z } from "zod";

export const facilitiesList = [
  "Proper Lighting",
  "Air Conditioning",
  "High-Speed Wi-Fi",
  "Books & Journals",
  "Daily Newspaper",
  "Magazines",
  "Printing Services",
  "Silent Zone",
  "Group Study Room",
  "Private Cabins",
  "Discussion Room",
  "Computers",
  "Cafeteria",
  "Tea & Coffee",
  "RO Water",
  "Water Dispenser",
  "Resting Area",
  "Lockers",
  "Washrooms",
  "Separate Washrooms for Girls & Boys",
  "Separate Girls' Area",
  "Personal Charging Socket",
  "Personal LED Lights",
  "Power Backup",
  "CCTV Surveillance",
  "Biometric Access",
  "First Aid",
  "Fire Safety",
  "Emergency Exit",
  "Wheelchair Access",
  "Open-Air Study",
  "Noise Cancellation",
  "24×7 Open",
  "Lunch Room"
] as const;

export const librarianSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  contactNumber: z.string().regex(/^\d{10}$/, "Contact number must be 10 digits"),
  profilePhoto: z.instanceof(File).optional(),
});

const libraryPlanSchema = z.object({
  id: z.string(),
  hours: z.string().min(1, { message: "Hours are required" }),
  monthlyFee: z.string().min(1, { message: "Monthly fee is required" }),
  planType: z.string().min(1, { message: "Plan type is required" }),
  description: z.string().optional()
})
  .refine(data => {
    // Ensure hours can be converted to a positive number
    const hoursNum = Number(data.hours);
    return !isNaN(hoursNum) && hoursNum > 0;
  }, {
    message: "Hours must be a positive number",
    path: ["hours"]
  })
  .refine(data => {
    // Ensure monthlyFee can be converted to a non-negative number
    const feeNum = Number(data.monthlyFee);
    return !isNaN(feeNum) && feeNum >= 0;
  }, {
    message: "Monthly fee must be a non-negative number",
    path: ["monthlyFee"]
  });

export const librarySchema = z.object({
  libraryName: z.string()
    .min(2, { message: "Library name must be at least 2 characters" })
    .max(100, { message: "Library name cannot exceed 100 characters" }),

  // Address Details
  address: z.string()
    .min(10, { message: "Address must be at least 10 characters" })
    .max(500, { message: "Address cannot exceed 500 characters" }),

  city: z.string()
    .min(2, { message: "City name must be at least 2 characters" })
    .max(50, { message: "City name cannot exceed 50 characters" }),

  state: z.string()
    .min(2, { message: "State name must be at least 2 characters" })
    .max(50, { message: "State name cannot exceed 50 characters" }),

  pincode: z.string()
    .regex(/^\d{6}$/, { message: "Pincode must be 6 digits" }),

  // Optional Google Maps Link (URL validation)
  googleMapLink: z.string().url({ message: "Invalid Google Maps URL" }).optional(),

  // Seats
  totalSeats: z.coerce.number()
    .int({ message: "Total seats must be a whole number" })
    .positive({ message: "Total seats must be a positive number" })
    .max(1000, { message: "Total seats cannot exceed 1000" }),

  // Timings
  openingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid opening time format" }),
  closingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid closing time format" }),

  // New fields
  whatsappNumber: z.string()
    .regex(/^\d{10}$/, { message: "WhatsApp number must be 10 digits" }),

  // feePerHour: z.coerce.number()
  //   .nonnegative({ message: "Fee per hour cannot be negative" }),

  // feePerMonth: z.coerce.number()
  //   .nonnegative({ message: "Fee per month cannot be negative" }),

  review_status: z.enum(["pending", "approved", "rejected"])
    .default("pending"),

  // Facilities Validation
  selectedFacilities: z.array(z.enum(facilitiesList))
    .optional(),

  plans: z.array(libraryPlanSchema)
    .min(2, { message: "At least two plans are required" })
    .refine(plans => {
      // Ensure we have at least one basic plan and one seat allocation plan
      const hasBasicPlan = plans.some(plan =>
        plan.planType === "Any Time" ||
        plan.description?.toLowerCase().includes("basic")
      );

      const hasSeatPlan = plans.some(plan =>
        plan.planType === "Fixed Seat" ||
        plan.description?.toLowerCase().includes("seat")
      );

      return hasBasicPlan && hasSeatPlan;
    }, {
      message: "You must include at least one Basic Plan and one Seat Allocation Plan",
      path: ["plans"]
    }),

  // Photos Validation
  photos: z.array(z.instanceof(File))
    .max(6, { message: "Cannot upload more than 6 photos" })
    .optional()
})
  .refine(data => {
    // Custom validation to ensure closing time is after opening time
    const openTime = new Date(`2000-01-01T${data.openingTime}`);
    const closeTime = new Date(`2000-01-01T${data.closingTime}`);
    return closeTime > openTime;
  }, {
    message: "Closing time must be later than opening time",
    path: ["closingTime"]
  });