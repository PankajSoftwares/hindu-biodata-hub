import type { Biodata } from "@/lib/biodata";
import {
  ROWS, RELIGION_ROWS, CAREER_ROWS, FAMILY_ROWS, HORO_ROWS, LIFE_ROWS, CONTACT_ROWS,
  PhotoBox, val,
} from "./shared";

function Block({ title, rows, data }: { title: string; rows: { label: string; key: keyof Biodata }[]; data: Biodata }) {
  return (
    <div className="mb-5">
      <h3 className="font-display text-[15px] italic text-[#7a1f2b]">{title}</h3>
      <div className="mt-1 h-px w-full bg-gradient-to-r from-[#c9a14a] via-[#c9a14a]/40 to-transparent" />
      <div className="mt-2 space-y-1 text-[13px]">
        {rows.map((r) => (
          <div key={String(r.key)} className="grid grid-cols-[140px_1fr] gap-3">
            <span className="text-[#8a6a3a]">{r.label}</span>
            <span className="text-neutral-800">{val(data, r.key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ElegantTemplate({ data }: { data: Biodata }) {
  return (
    <div
      className="mx-auto w-full max-w-[800px] p-10 shadow-lg ring-1 ring-[#e9d9b5]"
      style={{ fontFamily: "'Fira Sans', sans-serif", background: "linear-gradient(180deg,#fdf6e4 0%,#fbf1d8 100%)" }}
    >
      <div className="border-2 border-double border-[#c9a14a] p-8">
        <div className="grid items-center gap-6 md:grid-cols-[160px_1fr]">
          <div className="mx-auto h-[200px] w-[160px] overflow-hidden rounded-md border border-[#c9a14a] bg-white">
            <PhotoBox photo={data.photo} />
          </div>
          <div className="text-center md:text-left">
            <p className="font-display italic text-[#7a1f2b]">~ Biodata ~</p>
            <h1 className="mt-2 font-display text-4xl text-[#5a1620]">{data.fullName || "Your Name"}</h1>
            <p className="mt-2 text-sm text-[#6b4a2a]">
              {[data.education, data.occupation].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>
        <div className="my-6 h-px w-full bg-[#c9a14a]/60" />
        <div className="grid gap-x-10 md:grid-cols-2">
          <div>
            <Block title="Personal" rows={ROWS} data={data} />
            <Block title="Religion" rows={RELIGION_ROWS} data={data} />
            <Block title="Horoscope" rows={HORO_ROWS} data={data} />
          </div>
          <div>
            <Block title="Career" rows={CAREER_ROWS} data={data} />
            <Block title="Family" rows={FAMILY_ROWS} data={data} />
            <Block title="Lifestyle" rows={LIFE_ROWS} data={data} />
          </div>
        </div>
        <Block title="Contact" rows={CONTACT_ROWS} data={data} />
        {data.expectations && (
          <div>
            <h3 className="font-display text-[15px] italic text-[#7a1f2b]">Partner Expectations</h3>
            <div className="mt-1 h-px w-full bg-gradient-to-r from-[#c9a14a] via-[#c9a14a]/40 to-transparent" />
            <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">{data.expectations}</p>
          </div>
        )}
        <div className="mt-6 text-center text-[11px] tracking-[0.3em] text-[#7a1f2b]">
          ✦ ॐ श्री गणेशाय नमः ✦
        </div>
      </div>
    </div>
  );
}