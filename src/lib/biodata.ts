// Document model: a biodata is a list of sections, each containing field IDs.
// Fields live in a shared map (keyed by id) so they can be moved between sections.

export type SectionId =
  | "personal"
  | "religion"
  | "career"
  | "family"
  | "horoscope"
  | "lifestyle"
  | "contact";

export type FieldKind = "text" | "date" | "email" | "tel" | "longtext";

export type FieldDef = {
  id: string;
  label: string;
  value: string;
  visible: boolean;
  kind: FieldKind;
  custom?: boolean;
};

export type Section = {
  id: SectionId;
  label: string;
  fieldIds: string[];
};

export type BiodataDoc = {
  photo: { value: string; visible: boolean };
  fields: Record<string, FieldDef>;
  sections: Section[];
};

export type TemplateId = "traditional" | "modern" | "elegant";

export const TEMPLATES: { id: TemplateId; name: string; tag: string; description: string }[] = [
  { id: "traditional", name: "Traditional Maroon", tag: "Classic", description: "Timeless maroon header with gold ornamental dividers and Ganesh motif." },
  { id: "modern", name: "Modern Minimal", tag: "Modern", description: "Clean grid layout with generous whitespace and a subtle accent rule." },
  { id: "elegant", name: "Elegant Premium", tag: "Premium", description: "Champagne background with gold borders and refined two-column layout." },
];

// Built-in field definitions, used to seed an empty document.
type Seed = Omit<FieldDef, "value" | "visible"> & { value?: string; visible?: boolean };

const SECTION_LABELS: Record<SectionId, string> = {
  personal: "Personal Details",
  religion: "Religious Background",
  career: "Education & Career",
  family: "Family Details",
  horoscope: "Horoscope",
  lifestyle: "Lifestyle & Expectations",
  contact: "Contact Details",
};

const SECTION_SEEDS: Record<SectionId, Seed[]> = {
  personal: [
    { id: "fullName", label: "Full Name", kind: "text" },
    { id: "gender", label: "Gender", kind: "text" },
    { id: "dob", label: "Date of Birth", kind: "date" },
    { id: "age", label: "Age", kind: "text" },
    { id: "height", label: "Height", kind: "text" },
    { id: "weight", label: "Weight", kind: "text" },
    { id: "complexion", label: "Complexion", kind: "text" },
    { id: "maritalStatus", label: "Marital Status", kind: "text" },
  ],
  religion: [
    { id: "religion", label: "Religion", kind: "text" },
    { id: "caste", label: "Caste", kind: "text" },
    { id: "subCaste", label: "Sub Caste", kind: "text" },
    { id: "gotra", label: "Gotra", kind: "text" },
    { id: "manglik", label: "Manglik", kind: "text" },
  ],
  career: [
    { id: "education", label: "Education", kind: "text" },
    { id: "occupation", label: "Occupation", kind: "text" },
    { id: "income", label: "Annual Income", kind: "text" },
  ],
  family: [
    { id: "fatherName", label: "Father's Name", kind: "text" },
    { id: "fatherOccupation", label: "Father's Occupation", kind: "text" },
    { id: "motherName", label: "Mother's Name", kind: "text" },
    { id: "motherOccupation", label: "Mother's Occupation", kind: "text" },
    { id: "siblings", label: "Siblings", kind: "text" },
    { id: "familyType", label: "Family Type", kind: "text" },
    { id: "familyValues", label: "Family Values", kind: "text" },
    { id: "nativePlace", label: "Native Place", kind: "text" },
  ],
  horoscope: [
    { id: "rashi", label: "Rashi", kind: "text" },
    { id: "nakshatra", label: "Nakshatra", kind: "text" },
    { id: "birthTime", label: "Birth Time", kind: "text" },
    { id: "birthPlace", label: "Birth Place", kind: "text" },
  ],
  lifestyle: [
    { id: "hobbies", label: "Hobbies", kind: "text" },
    { id: "diet", label: "Diet", kind: "text" },
    { id: "languages", label: "Languages Known", kind: "text" },
    { id: "expectations", label: "Expectations from Partner", kind: "longtext" },
  ],
  contact: [
    { id: "mobile", label: "Mobile", kind: "tel" },
    { id: "email", label: "Email", kind: "email" },
    { id: "address", label: "Address", kind: "longtext" },
    { id: "instagram", label: "Instagram", kind: "text" },
    { id: "linkedin", label: "LinkedIn", kind: "text" },
    { id: "facebook", label: "Facebook", kind: "text" },
  ],
};

export const SECTION_ORDER: SectionId[] = [
  "personal",
  "religion",
  "career",
  "family",
  "horoscope",
  "lifestyle",
  "contact",
];

export function emptyDoc(): BiodataDoc {
  const fields: Record<string, FieldDef> = {};
  const sections: Section[] = SECTION_ORDER.map((sid) => {
    const seeds = SECTION_SEEDS[sid];
    seeds.forEach((s) => {
      fields[s.id] = {
        id: s.id,
        label: s.label,
        kind: s.kind,
        value: s.value ?? "",
        visible: s.visible ?? true,
      };
    });
    return { id: sid, label: SECTION_LABELS[sid], fieldIds: seeds.map((s) => s.id) };
  });
  return {
    photo: { value: "", visible: true },
    fields,
    sections,
  };
}

const SAMPLE_VALUES: Record<string, string> = {
  fullName: "Aarav Sharma",
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
  fatherName: "Mr. Rajesh Sharma",
  fatherOccupation: "Retired Bank Manager",
  motherName: "Mrs. Sunita Sharma",
  motherOccupation: "Homemaker",
  siblings: "1 younger sister (Pursuing MBBS)",
  familyType: "Nuclear",
  familyValues: "Traditional",
  nativePlace: "Jaipur, Rajasthan",
  rashi: "Simha (Leo)",
  nakshatra: "Magha",
  birthTime: "06:42 AM",
  birthPlace: "Jaipur, Rajasthan",
  hobbies: "Reading, Trekking, Classical music, Photography",
  diet: "Vegetarian",
  languages: "Hindi, English, Marathi",
  expectations:
    "Looking for an educated, family-oriented life partner who values tradition, kindness, and personal growth.",
  mobile: "+91 98765 43210",
  email: "aarav.sharma@example.com",
  address: "Koramangala, Bengaluru, Karnataka — 560034",
  instagram: "@aarav.sharma",
  linkedin: "linkedin.com/in/aaravsharma",
  facebook: "",
};

export function sampleDoc(): BiodataDoc {
  const doc = emptyDoc();
  for (const id of Object.keys(SAMPLE_VALUES)) {
    if (doc.fields[id]) doc.fields[id].value = SAMPLE_VALUES[id];
  }
  return doc;
}

export function newCustomField(label = "Custom Field", value = ""): FieldDef {
  return {
    id: `custom_${Math.random().toString(36).slice(2, 10)}`,
    label,
    value,
    visible: true,
    kind: "text",
    custom: true,
  };
}

// Migrate a legacy flat Biodata payload (older versions of localStorage) into a doc.
export function migrateLegacy(legacy: Record<string, unknown>): BiodataDoc {
  const doc = emptyDoc();
  if (typeof legacy.photo === "string") doc.photo.value = legacy.photo;
  for (const id of Object.keys(doc.fields)) {
    const v = legacy[id];
    if (typeof v === "string") doc.fields[id].value = v;
  }
  return doc;
}
