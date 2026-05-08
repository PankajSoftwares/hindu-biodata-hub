import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhotoDropzone } from "./PhotoDropzone";
import type { Biodata } from "@/lib/biodata";

function Field({
  label, name, value, onChange, placeholder, type = "text",
}: {
  label: string;
  name: keyof Biodata;
  value: string;
  onChange: (k: keyof Biodata, v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={String(name)} className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Input
        id={String(name)}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
}

function Area({
  label, name, value, onChange, placeholder,
}: {
  label: string;
  name: keyof Biodata;
  value: string;
  onChange: (k: keyof Biodata, v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5 sm:col-span-2">
      <Label htmlFor={String(name)} className="text-xs font-medium text-muted-foreground">{label}</Label>
      <Textarea
        id={String(name)}
        value={value}
        rows={3}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <h3 className="font-display text-lg text-primary">{children}</h3>
      <span className="h-px flex-1 bg-gold/40" />
    </div>
  );
}

export function BiodataForm({
  data,
  update,
}: {
  data: Biodata;
  update: <K extends keyof Biodata>(k: K, v: Biodata[K]) => void;
}) {
  const f = (name: keyof Biodata, label: string, placeholder?: string, type = "text") => (
    <Field label={label} name={name} value={(data[name] as string) ?? ""} onChange={(k, v) => update(k, v as Biodata[typeof k])} placeholder={placeholder} type={type} />
  );
  const a = (name: keyof Biodata, label: string, placeholder?: string) => (
    <Area label={label} name={name} value={(data[name] as string) ?? ""} onChange={(k, v) => update(k, v as Biodata[typeof k])} placeholder={placeholder} />
  );

  return (
    <div className="space-y-8">
      <section id="personal">
        <SectionTitle>Personal Details</SectionTitle>
        <PhotoDropzone value={data.photo} onChange={(v) => update("photo", v)} />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {f("fullName", "Full Name", "Aarav Sharma")}
          {f("gender", "Gender", "Male / Female")}
          {f("dob", "Date of Birth", "", "date")}
          {f("age", "Age", "29")}
          {f("height", "Height", "5 ft 10 in")}
          {f("weight", "Weight", "72 kg")}
          {f("complexion", "Complexion", "Fair")}
          {f("maritalStatus", "Marital Status", "Never Married")}
        </div>
      </section>

      <section id="religion">
        <SectionTitle>Religious Background</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {f("religion", "Religion", "Hindu")}
          {f("caste", "Caste", "Brahmin")}
          {f("subCaste", "Sub Caste", "Saraswat")}
          {f("gotra", "Gotra", "Bharadwaj")}
          {f("manglik", "Manglik", "Yes / No")}
        </div>
      </section>

      <section id="career">
        <SectionTitle>Education & Career</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {f("education", "Education", "M.Tech, IIT Bombay")}
          {f("occupation", "Occupation", "Software Engineer")}
          {f("income", "Annual Income", "₹ 24 LPA")}
        </div>
      </section>

      <section id="family">
        <SectionTitle>Family Details</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {f("fatherName", "Father's Name")}
          {f("fatherOccupation", "Father's Occupation")}
          {f("motherName", "Mother's Name")}
          {f("motherOccupation", "Mother's Occupation")}
          {f("siblings", "Siblings")}
          {f("familyType", "Family Type", "Nuclear / Joint")}
          {f("familyValues", "Family Values", "Traditional / Modern")}
          {f("nativePlace", "Native Place")}
        </div>
      </section>

      <section id="horoscope">
        <SectionTitle>Horoscope</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {f("rashi", "Rashi", "Simha (Leo)")}
          {f("nakshatra", "Nakshatra", "Magha")}
          {f("birthTime", "Birth Time", "06:42 AM")}
          {f("birthPlace", "Birth Place")}
        </div>
      </section>

      <section id="lifestyle">
        <SectionTitle>Lifestyle & Expectations</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {f("hobbies", "Hobbies")}
          {f("diet", "Diet", "Vegetarian")}
          {f("languages", "Languages Known", "Hindi, English")}
          {a("expectations", "Expectations from Partner")}
        </div>
      </section>

      <section id="contact">
        <SectionTitle>Contact Details</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {f("mobile", "Mobile Number", "+91 ...")}
          {f("email", "Email", "you@example.com", "email")}
          {a("address", "Address")}
          {f("instagram", "Instagram (optional)")}
          {f("linkedin", "LinkedIn (optional)")}
          {f("facebook", "Facebook (optional)")}
        </div>
      </section>
    </div>
  );
}