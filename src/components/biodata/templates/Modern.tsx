import type { BiodataDoc } from "@/lib/biodata";
import { PhotoBox, getFieldValue, visibleSections } from "./shared";

export function ModernTemplate({ doc }: { doc: BiodataDoc }) {
  const groups = visibleSections(doc);
  const showPhoto = doc.photo.visible && !!doc.photo.value;

  const headerName = getFieldValue(doc, "fullName");
  const subParts = [getFieldValue(doc, "occupation"), getFieldValue(doc, "nativePlace")].filter(Boolean);

  return (
    <div
      className="mx-auto w-full max-w-[800px] bg-white p-10 text-neutral-900 shadow-md ring-1 ring-neutral-200"
      style={{ fontFamily: "'Fira Sans', sans-serif" }}
    >
      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a1f2b]">Biodata</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-neutral-900">
            {headerName || "Your Name"}
          </h1>
          {subParts.length > 0 && (
            <p className="mt-2 text-sm text-neutral-500">{subParts.join(" · ")}</p>
          )}
        </div>
        {showPhoto && (
          <div className="h-[150px] w-[120px] shrink-0 overflow-hidden rounded-md ring-1 ring-neutral-200">
            <PhotoBox photo={doc.photo.value} />
          </div>
        )}
      </div>
      <div className="mt-6 h-px w-full bg-neutral-200" />
      {groups.map((g) => (
        <section key={g.section.id} className="mt-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a1f2b]">
            {g.section.label}
          </h3>
          <div className="mt-2 h-px w-10 bg-[#c9a14a]" />
          <dl className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {g.rows.map((r) =>
              r.longtext ? (
                <div key={r.id} className="border-b border-dashed border-neutral-200 py-1.5 text-[13px] sm:col-span-2">
                  <dt className="text-neutral-500">{r.label}</dt>
                  <dd className="mt-1 whitespace-pre-wrap font-medium text-neutral-900">{r.value}</dd>
                </div>
              ) : (
                <div
                  key={r.id}
                  className="flex justify-between gap-4 border-b border-dashed border-neutral-200 py-1.5 text-[13px]"
                >
                  <dt className="text-neutral-500">{r.label}</dt>
                  <dd className="text-right font-medium text-neutral-900">{r.value}</dd>
                </div>
              ),
            )}
          </dl>
        </section>
      ))}
    </div>
  );
}
