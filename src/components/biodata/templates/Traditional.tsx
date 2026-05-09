import type { BiodataDoc } from "@/lib/biodata";
import { PhotoBox, visibleSections } from "./shared";

export function TraditionalTemplate({ doc }: { doc: BiodataDoc }) {
  const groups = visibleSections(doc);
  const showPhoto = doc.photo.visible && !!doc.photo.value;

  // Pull personal-section row to render alongside photo, then everything below.
  const personal = groups.find((g) => g.section.id === "personal");
  const religion = groups.find((g) => g.section.id === "religion");
  const others = groups.filter((g) => g.section.id !== "personal" && g.section.id !== "religion");

  return (
    <div
      className="relative mx-auto w-full max-w-[800px] bg-[#fdf8f1] p-8 text-[#1a1a1a] shadow-md ring-1 ring-[#e9d9b5]"
      style={{ fontFamily: "'Fira Sans', sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-3 border border-[#c9a14a]/60" />
      <div className="pointer-events-none absolute inset-4 border border-[#c9a14a]/30" />
      <div className="relative">
        <div className="text-center">
          <div className="font-display text-2xl text-[#7a1f2b]">|| श्री गणेशाय नमः ||</div>
          <div className="mx-auto mt-2 h-px w-40 bg-[#c9a14a]" />
          <h1 className="mt-3 font-display text-3xl tracking-wide text-[#7a1f2b]">Biodata</h1>
        </div>

        <div className={`mt-6 grid gap-6 ${showPhoto ? "md:grid-cols-[1fr_180px]" : ""}`}>
          <div>
            {personal && <SectionTable title={personal.section.label} rows={personal.rows} />}
            {religion && <SectionTable title={religion.section.label} rows={religion.rows} />}
          </div>
          {showPhoto && (
            <div className="mx-auto h-[220px] w-[180px] overflow-hidden border-2 border-[#c9a14a] bg-white shadow-sm">
              <PhotoBox photo={doc.photo.value} />
            </div>
          )}
        </div>

        {others.map((g) => (
          <SectionTable key={g.section.id} title={g.section.label} rows={g.rows} />
        ))}

        <div className="mt-6 text-center text-[11px] tracking-widest text-[#7a1f2b]/70">
          ✦  जय श्री कृष्ण  ✦
        </div>
      </div>
    </div>
  );
}

function SectionTable({
  title,
  rows,
}: {
  title: string;
  rows: { id: string; label: string; value: string; longtext: boolean }[];
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#c9a14a]" />
        <h3 className="font-display text-[15px] uppercase tracking-[0.18em] text-[#7a1f2b]">{title}</h3>
        <span className="h-px flex-1 bg-[#c9a14a]" />
      </div>
      <table className="w-full border-collapse text-[13px]">
        <tbody>
          {rows.map((r) =>
            r.longtext ? (
              <tr key={r.id} className="border-b border-[#efe4cb] last:border-0">
                <td colSpan={2} className="py-1.5 align-top">
                  <div className="font-medium text-[#5a3a18]">{r.label}</div>
                  <div className="mt-0.5 whitespace-pre-wrap text-[#1f1410]">{r.value}</div>
                </td>
              </tr>
            ) : (
              <tr key={r.id} className="border-b border-[#efe4cb] last:border-0">
                <td className="w-[42%] py-1.5 pr-3 align-top font-medium text-[#5a3a18]">{r.label}</td>
                <td className="py-1.5 align-top text-[#1f1410]">{r.value}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
