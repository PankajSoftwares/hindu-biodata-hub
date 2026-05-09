import type { BiodataDoc } from "@/lib/biodata";
import { PhotoBox, getFieldValue, visibleSections } from "./shared";

export function ElegantTemplate({ doc }: { doc: BiodataDoc }) {
  const groups = visibleSections(doc);
  const showPhoto = doc.photo.visible && !!doc.photo.value;
  const name = getFieldValue(doc, "fullName");
  const sub = [getFieldValue(doc, "education"), getFieldValue(doc, "occupation")].filter(Boolean);

  // Split groups into two columns; long-text groups go full-width below.
  const longGroups = groups.filter((g) => g.rows.some((r) => r.longtext));
  const shortGroups = groups.filter((g) => !longGroups.includes(g));
  const left = shortGroups.filter((_, i) => i % 2 === 0);
  const right = shortGroups.filter((_, i) => i % 2 === 1);

  return (
    <div
      className="mx-auto w-full max-w-[800px] p-10 shadow-lg ring-1 ring-[#e9d9b5]"
      style={{
        fontFamily: "'Fira Sans', sans-serif",
        background: "linear-gradient(180deg,#fdf6e4 0%,#fbf1d8 100%)",
      }}
    >
      <div className="border-2 border-double border-[#c9a14a] p-8">
        <div className={`grid items-center gap-6 ${showPhoto ? "md:grid-cols-[160px_1fr]" : ""}`}>
          {showPhoto && (
            <div className="mx-auto h-[200px] w-[160px] overflow-hidden rounded-md border border-[#c9a14a] bg-white">
              <PhotoBox photo={doc.photo.value} />
            </div>
          )}
          <div className={`text-center ${showPhoto ? "md:text-left" : ""}`}>
            <p className="font-display italic text-[#7a1f2b]">~ Biodata ~</p>
            <h1 className="mt-2 font-display text-4xl text-[#5a1620]">{name || "Your Name"}</h1>
            {sub.length > 0 && <p className="mt-2 text-sm text-[#6b4a2a]">{sub.join(" · ")}</p>}
          </div>
        </div>
        <div className="my-6 h-px w-full bg-[#c9a14a]/60" />

        <div className="grid gap-x-10 md:grid-cols-2">
          <div>{left.map((g) => <Block key={g.section.id} title={g.section.label} rows={g.rows} />)}</div>
          <div>{right.map((g) => <Block key={g.section.id} title={g.section.label} rows={g.rows} />)}</div>
        </div>

        {longGroups.map((g) => (
          <Block key={g.section.id} title={g.section.label} rows={g.rows} fullWidth />
        ))}

        <div className="mt-6 text-center text-[11px] tracking-[0.3em] text-[#7a1f2b]">
          ✦ ॐ श्री गणेशाय नमः ✦
        </div>
      </div>
    </div>
  );
}

function Block({
  title,
  rows,
  fullWidth,
}: {
  title: string;
  rows: { id: string; label: string; value: string; longtext: boolean }[];
  fullWidth?: boolean;
}) {
  return (
    <div className={`mb-5 ${fullWidth ? "" : ""}`}>
      <h3 className="font-display text-[15px] italic text-[#7a1f2b]">{title}</h3>
      <div className="mt-1 h-px w-full bg-gradient-to-r from-[#c9a14a] via-[#c9a14a]/40 to-transparent" />
      <div className="mt-2 space-y-1 text-[13px]">
        {rows.map((r) =>
          r.longtext ? (
            <div key={r.id}>
              <div className="text-[#8a6a3a]">{r.label}</div>
              <div className="mt-0.5 whitespace-pre-wrap text-neutral-800">{r.value}</div>
            </div>
          ) : (
            <div key={r.id} className="grid grid-cols-[140px_1fr] gap-3">
              <span className="text-[#8a6a3a]">{r.label}</span>
              <span className="text-neutral-800">{r.value}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
