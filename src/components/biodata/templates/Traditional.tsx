import type { Biodata } from "@/lib/biodata";
import {
  ROWS, RELIGION_ROWS, CAREER_ROWS, FAMILY_ROWS, HORO_ROWS, LIFE_ROWS, CONTACT_ROWS,
  PhotoBox, val,
} from "./shared";

function Section({ title, rows, data }: { title: string; rows: { label: string; key: keyof Biodata }[]; data: Biodata }) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#c9a14a]" />
        <h3 className="font-display text-[15px] uppercase tracking-[0.18em] text-[#7a1f2b]">{title}</h3>
        <span className="h-px flex-1 bg-[#c9a14a]" />
      </div>
      <table className="w-full border-collapse text-[13px]">
        <tbody>
          {rows.map((r) => (
            <tr key={String(r.key)} className="border-b border-[#efe4cb] last:border-0">
              <td className="w-[42%] py-1.5 pr-3 align-top font-medium text-[#5a3a18]">{r.label}</td>
              <td className="py-1.5 align-top text-[#1f1410]">{val(data, r.key)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TraditionalTemplate({ data }: { data: Biodata }) {
  return (
    <div className="relative mx-auto w-full max-w-[800px] bg-[#fdf8f1] p-8 text-[#1a1a1a] shadow-md ring-1 ring-[#e9d9b5]" style={{ fontFamily: "'Fira Sans', sans-serif" }}>
      {/* Ornate border */}
      <div className="pointer-events-none absolute inset-3 border border-[#c9a14a]/60" />
      <div className="pointer-events-none absolute inset-4 border border-[#c9a14a]/30" />
      <div className="relative">
        {/* Header */}
        <div className="text-center">
          <div className="font-display text-2xl text-[#7a1f2b]">|| श्री गणेशाय नमः ||</div>
          <div className="mx-auto mt-2 h-px w-40 bg-[#c9a14a]" />
          <h1 className="mt-3 font-display text-3xl tracking-wide text-[#7a1f2b]">Biodata</h1>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_180px]">
          <div>
            <Section title="Personal Details" rows={ROWS} data={data} />
            <Section title="Religious Background" rows={RELIGION_ROWS} data={data} />
          </div>
          <div className="mx-auto h-[220px] w-[180px] overflow-hidden border-2 border-[#c9a14a] bg-white shadow-sm">
            <PhotoBox photo={data.photo} />
          </div>
        </div>

        <Section title="Education & Career" rows={CAREER_ROWS} data={data} />
        <Section title="Family Details" rows={FAMILY_ROWS} data={data} />
        <Section title="Horoscope" rows={HORO_ROWS} data={data} />
        <Section title="Lifestyle" rows={LIFE_ROWS} data={data} />
        <Section title="Contact Details" rows={CONTACT_ROWS} data={data} />

        {data.expectations && (
          <div className="mb-2">
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#c9a14a]" />
              <h3 className="font-display text-[15px] uppercase tracking-[0.18em] text-[#7a1f2b]">Expectations</h3>
              <span className="h-px flex-1 bg-[#c9a14a]" />
            </div>
            <p className="text-[13px] leading-relaxed text-[#1f1410]">{data.expectations}</p>
          </div>
        )}

        <div className="mt-6 text-center text-[11px] tracking-widest text-[#7a1f2b]/70">
          ✦  जय श्री कृष्ण  ✦
        </div>
      </div>
    </div>
  );
}