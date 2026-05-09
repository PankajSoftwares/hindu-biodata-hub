import type { BiodataDoc, FieldDef, Section } from "@/lib/biodata";

export type RenderRow = { id: string; label: string; value: string; longtext: boolean };

export function visibleSections(doc: BiodataDoc): { section: Section; rows: RenderRow[] }[] {
  return doc.sections
    .map((section) => {
      const rows = section.fieldIds
        .map((id) => doc.fields[id])
        .filter((f): f is FieldDef => !!f && f.visible && f.value.trim().length > 0)
        .map((f) => ({
          id: f.id,
          label: f.label || "—",
          value: f.value,
          longtext: f.kind === "longtext" || f.value.length > 90,
        }));
      return { section, rows };
    })
    .filter((s) => s.rows.length > 0);
}

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

export function getFieldValue(doc: BiodataDoc, id: string): string {
  const f = doc.fields[id];
  if (!f || !f.visible) return "";
  return f.value;
}
