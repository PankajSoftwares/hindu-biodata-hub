export type Biodata = {
  // Personal
  fullName: string;
  photo?: string; // base64
  gender: string;
  dob: string;
  age: string;
  height: string;
  weight: string;
  complexion: string;
  maritalStatus: string;
  // Religion
  religion: string;
  caste: string;
  subCaste: string;
  gotra: string;
  manglik: string;
  // Education / Career
  education: string;
  occupation: string;
  income: string;
  // Contact
  mobile: string;
  email: string;
  address: string;
  nativePlace: string;
  // Family
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  familyValues: string;
  // Horoscope
  rashi: string;
  nakshatra: string;
  birthTime: string;
  birthPlace: string;
  // Lifestyle
  hobbies: string;
  diet: string;
  languages: string;
  expectations: string;
  // Social
  instagram: string;
  linkedin: string;
  facebook: string;
};

export const emptyBiodata: Biodata = {
  fullName: "", photo: "", gender: "", dob: "", age: "", height: "", weight: "",
  complexion: "", maritalStatus: "Never Married",
  religion: "Hindu", caste: "", subCaste: "", gotra: "", manglik: "No",
  education: "", occupation: "", income: "",
  mobile: "", email: "", address: "", nativePlace: "",
  fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "",
  siblings: "", familyType: "Nuclear", familyValues: "Traditional",
  rashi: "", nakshatra: "", birthTime: "", birthPlace: "",
  hobbies: "", diet: "Vegetarian", languages: "", expectations: "",
  instagram: "", linkedin: "", facebook: "",
};

export const sampleBiodata: Biodata = {
  fullName: "Aarav Sharma",
  photo: "",
  gender: "Male",
  dob: "1996-08-14",
  age: "29",
  height: "5 ft 10 in",
  weight: "72 kg",
  complexion: "Fair",
  maritalStatus: "Never Married",
  religion: "Hindu",
  caste: "Brahmin",
  subCaste: "Saraswat",
  gotra: "Bharadwaj",
  manglik: "No",
  education: "M.Tech, Computer Science (IIT Bombay)",
  occupation: "Senior Software Engineer at Infosys",
  income: "₹ 24 LPA",
  mobile: "+91 98765 43210",
  email: "aarav.sharma@example.com",
  address: "Koramangala, Bengaluru, Karnataka — 560034",
  nativePlace: "Jaipur, Rajasthan",
  fatherName: "Mr. Rajesh Sharma",
  fatherOccupation: "Retired Bank Manager",
  motherName: "Mrs. Sunita Sharma",
  motherOccupation: "Homemaker",
  siblings: "1 younger sister (Pursuing MBBS)",
  familyType: "Nuclear",
  familyValues: "Traditional",
  rashi: "Simha (Leo)",
  nakshatra: "Magha",
  birthTime: "06:42 AM",
  birthPlace: "Jaipur, Rajasthan",
  hobbies: "Reading, Trekking, Classical music, Photography",
  diet: "Vegetarian",
  languages: "Hindi, English, Marathi",
  expectations:
    "Looking for an educated, family-oriented life partner who values tradition, kindness, and personal growth.",
  instagram: "@aarav.sharma",
  linkedin: "linkedin.com/in/aaravsharma",
  facebook: "",
};

export const FORM_SECTIONS = [
  { id: "personal", label: "Personal" },
  { id: "religion", label: "Religion" },
  { id: "career", label: "Education & Career" },
  { id: "family", label: "Family" },
  { id: "horoscope", label: "Horoscope" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "contact", label: "Contact" },
] as const;

export type TemplateId = "traditional" | "modern" | "elegant";

export const TEMPLATES: { id: TemplateId; name: string; tag: string; description: string }[] = [
  { id: "traditional", name: "Traditional Maroon", tag: "Classic", description: "Timeless maroon header with gold ornamental dividers and Ganesh motif." },
  { id: "modern", name: "Modern Minimal", tag: "Modern", description: "Clean grid layout with generous whitespace and a subtle accent rule." },
  { id: "elegant", name: "Elegant Premium", tag: "Premium", description: "Champagne background with gold borders and refined two-column layout." },
];