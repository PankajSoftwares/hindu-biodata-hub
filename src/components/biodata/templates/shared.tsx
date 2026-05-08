import type { Biodata } from "@/lib/biodata";

export const ROWS: { label: string; key: keyof Biodata }[] = [
  { label: "Full Name", key: "fullName" },
  { label: "Date of Birth", key: "dob" },
  { label: "Age", key: "age" },
  { label: "Gender", key: "gender" },
  { label: "Height", key: "height" },
  { label: "Weight", key: "weight" },
  { label: "Complexion", key: "complexion" },
  { label: "Marital Status", key: "maritalStatus" },
];

export const RELIGION_ROWS: { label: string; key: keyof Biodata }[] = [
  { label: "Religion", key: "religion" },
  { label: "Caste", key: "caste" },
  { label: "Sub Caste", key: "subCaste" },
  { label: "Gotra", key: "gotra" },
  { label: "Manglik", key: "manglik" },
];

export const CAREER_ROWS: { label: string; key: keyof Biodata }[] = [
  { label: "Education", key: "education" },
  { label: "Occupation", key: "occupation" },
  { label: "Annual Income", key: "income" },
];

export const FAMILY_ROWS: { label: string; key: keyof Biodata }[] = [
  { label: "Father's Name", key: "fatherName" },
  { label: "Father's Occupation", key: "fatherOccupation" },
  { label: "Mother's Name", key: "motherName" },
  { label: "Mother's Occupation", key: "motherOccupation" },
  { label: "Siblings", key: "siblings" },
  { label: "Family Type", key: "familyType" },
  { label: "Family Values", key: "familyValues" },
  { label: "Native Place", key: "nativePlace" },
];

export const HORO_ROWS: { label: string; key: keyof Biodata }[] = [
  { label: "Rashi", key: "rashi" },
  { label: "Nakshatra", key: "nakshatra" },
  { label: "Birth Time", key: "birthTime" },
  { label: "Birth Place", key: "birthPlace" },
];

export const LIFE_ROWS: { label: string; key: keyof Biodata }[] = [
  { label: "Hobbies", key: "hobbies" },
  { label: "Diet", key: "diet" },
  { label: "Languages Known", key: "languages" },
];

export const CONTACT_ROWS: { label: string; key: keyof Biodata }[] = [
  { label: "Mobile", key: "mobile" },
  { label: "Email", key: "email" },
  { label: "Address", key: "address" },
];

export function PhotoBox({
  photo,
  className = "",
}: {
  photo?: string;
  className?: string;
}) {
  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={photo} alt="Profile" className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div
      className={`grid h-full w-full place-items-center bg-[#f3ece0] text-[10px] uppercase tracking-widest text-[#9a8665] ${className}`}
    >
      Photo
    </div>
  );
}

export function val(b: Biodata, k: keyof Biodata) {
  const v = b[k];
  return v && String(v).trim() ? String(v) : "—";
}