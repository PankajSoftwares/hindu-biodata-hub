import type { Biodata } from "@/lib/biodata";
import {
  ROWS, RELIGION_ROWS, CAREER_ROWS, FAMILY_ROWS, HORO_ROWS, LIFE_ROWS, CONTACT_ROWS,
  PhotoBox, val,
} from "./shared";

function Group({ title, rows, data }: { title: string; rows: { label: string; key: keyof Biodata }[]; data: Biodata }) {
  return (
    <section className="mt-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a1f2b]">{title}</h3>
      <div className="mt-2 h-px w-10 bg-[#c9a14a]" />
      <dl className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={String(r.key)} className="flex justify-between gap-4 border-b border-dashed border-neutral-200 py-1.5 text-[13px]">
            <dt className="text-neutral-500">{r.label}</dt>
            <dd className="text-right font-medium text-neutral-900">{val(data, r.key)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ModernTemplate({ data }: { data: Biodata }) {
  return (
    <div className="mx-auto w-full max-w-[800px] bg-white p-10 text-neutral-900 shadow-md ring-1 ring-neutral-200" style={{ fontFamily: "'Fira Sans', sans-serif" }}>
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7a1f2b]">Marriage Biodata</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-neutral-900">{data.fullName || "Your Name"}</h1>
          <p className="mt-2 text-sm text-neutral-500">
            {[data.occupation, data.nativePlace].filter(Boolean).join(" · ")}
          </p>
        </div>
        <div className="h-[150px] w-[120px] overflow-hidden rounded-md ring-1 ring-neutral-200">
          <PhotoBox photo={data.photo} />
        </div>
      </div>
      <div className="mt-6 h-px w-full bg-neutral-200" />
      <Group title="Personal" rows={ROWS} data={data} />
      <Group title="Religious Background" rows={RELIGION_ROWS} data={data} />
      <Group title="Education & Career" rows={CAREER_ROWS} data={data} />
      <Group title="Family" rows={FAMILY_ROWS} data={data} />
      <Group title="Horoscope" rows={HORO_ROWS} data={data} />
      <Group title="Lifestyle" rows={LIFE_ROWS} data={data} />
      <Group title="Contact" rows={CONTACT_ROWS} data={data} />
      {data.expectations && (
        <section className="mt-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a1f2b]">Partner Expectations</h3>
          <div className="mt-2 h-px w-10 bg-[#c9a14a]" />
          <p className="mt-3 text-[13px] leading-relaxed text-neutral-700">{data.expectations}</p>
        </section>
      )}
    </div>
  );
}