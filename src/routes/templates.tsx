import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BiodataPreview } from "@/components/biodata/BiodataPreview";
import { sampleBiodata, TEMPLATES } from "@/lib/biodata";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Biodata Templates — Free Biodata for Hindus" },
      { name: "description", content: "Browse traditional, modern, and elegant Hindu marriage biodata templates. Free to use, no watermark." },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Template Gallery</p>
        <h1 className="mt-2 font-display text-4xl text-primary md:text-5xl">Pick a template you love</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Every template is free, customisable, and exports to a clean A4 PDF without any watermark.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#eee5d3]/40">
              <div className="absolute inset-0 origin-top-left scale-[0.45] p-2">
                <BiodataPreview data={sampleBiodata} template={t.id} />
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl">{t.name}</h3>
                <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-gold">
                  {t.tag}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              <Button asChild className="mt-4 w-full">
                <Link to="/create">Use this template</Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}