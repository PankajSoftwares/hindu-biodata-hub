import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Download, Heart, ImageIcon, Layers, Lock, Palette, Smartphone, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BiodataPreview } from "@/components/biodata/BiodataPreview";
import { sampleBiodata, TEMPLATES } from "@/lib/biodata";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Free Biodata for Hindus — Create Beautiful Marriage Biodata" },
      { name: "description", content: "Make a stunning Hindu marriage biodata in minutes. Free templates, live preview, instant PDF download. No watermark, no signup." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <TemplatePreviews />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 60%), radial-gradient(ellipse at 80% 20%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 55%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/50 px-3 py-1 text-xs uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> 100% Free · No Watermark
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
            Create Beautiful{" "}
            <span className="text-primary">Hindu Marriage</span>{" "}
            <span className="italic text-gold">Biodata</span> for Free
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Choose a template, fill in your details, watch a live preview, and
            download a print-ready PDF in minutes. No signup, no payment, ever.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/create">
                Create Free Biodata <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/templates">Browse Templates</Link>
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["Live preview", "PDF download", "Mobile friendly", "Auto-save"].map((x) => (
              <li key={x} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-gold" /> {x}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 via-gold/10 to-transparent blur-2xl" />
          <div className="origin-top-left scale-[0.7] sm:scale-[0.78] md:scale-[0.62] lg:scale-[0.7] xl:scale-[0.8]">
            <BiodataPreview data={sampleBiodata} template="traditional" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Layers, title: "Multiple Templates", body: "Traditional, Modern, and Elegant designs ready to use." },
  { icon: Wand2, title: "Live Preview", body: "See your biodata update in real time as you type." },
  { icon: Download, title: "Instant PDF", body: "Download print-ready, watermark-free PDFs in one click." },
  { icon: Smartphone, title: "Mobile Friendly", body: "Create and edit comfortably from any device." },
  { icon: Palette, title: "Customisable", body: "Pick a template that matches your style — switch anytime." },
  { icon: Lock, title: "Private by Design", body: "Everything stays on your device. We never see your data." },
];

function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Features</p>
        <h2 className="mt-2 font-display text-4xl text-primary">Everything you need, nothing you don't</h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass rounded-xl p-5 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-display text-lg">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TemplatePreviews() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col items-end justify-between gap-3 md:flex-row">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Templates</p>
          <h2 className="mt-2 font-display text-4xl text-primary">Designed for Hindu weddings</h2>
        </div>
        <Link to="/templates" className="inline-flex items-center text-sm text-primary hover:underline">
          View all <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {TEMPLATES.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="group overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#eee5d3]/40">
              <div className="absolute inset-0 origin-top-left scale-[0.42] p-2">
                <BiodataPreview data={sampleBiodata} template={t.id} />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg">{t.name}</h3>
                <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-gold">{t.tag}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
              <Button asChild size="sm" variant="outline" className="mt-3 w-full">
                <Link to="/create">Use this template</Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: ImageIcon, title: "Pick a template", body: "Choose from our hand-crafted Hindu biodata templates." },
    { icon: Wand2, title: "Fill your details", body: "Add personal, family and horoscope details with live preview." },
    { icon: Download, title: "Download PDF", body: "Export a print-ready, watermark-free PDF in one click." },
  ];
  return (
    <section className="border-y border-border/60 bg-card/40 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">How it works</p>
          <h2 className="mt-2 font-display text-4xl text-primary">From blank page to biodata in 3 steps</h2>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-border/70 bg-background p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm text-primary-foreground">
                  {i + 1}
                </span>
                <s.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-3 font-display text-xl">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const QUOTES = [
  { name: "Priya & family", body: "Made our biodata in 10 minutes. The traditional template looked just like a wedding card!" },
  { name: "Ramesh, Pune", body: "Loved that there's no watermark. Printed directly and shared with relatives." },
  { name: "Anjali, Bengaluru", body: "Beautiful templates and a really clean live preview. Highly recommend." },
];

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Loved by families</p>
        <h2 className="mt-2 font-display text-4xl text-primary">Trusted across India</h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {QUOTES.map((q) => (
          <div key={q.name} className="rounded-xl border border-border/70 bg-card p-5 shadow-sm">
            <Heart className="h-4 w-4 text-gold" />
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{q.body}"</p>
            <p className="mt-3 text-xs text-muted-foreground">— {q.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Is it really free?", a: "Yes, completely free. No signup, no payment, no watermark on your downloaded biodata." },
  { q: "Where is my data stored?", a: "Right in your browser. We don't upload your details to any server." },
  { q: "Can I edit later?", a: "Yes — your draft auto-saves locally. Just come back to /create on the same device." },
  { q: "Will the PDF be print-ready?", a: "Absolutely. PDFs are exported at A4 size, ready to print or share digitally." },
];

function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">FAQ</p>
        <h2 className="mt-2 font-display text-4xl text-primary">Common questions</h2>
      </div>
      <div className="mt-8 space-y-3">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-lg border border-border/70 bg-card p-4 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              {f.q}
              <span className="text-gold transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16">
      <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-primary to-primary/80 p-10 text-center text-primary-foreground shadow-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
        <h2 className="font-display text-4xl">Ready to create your biodata?</h2>
        <p className="mt-2 text-sm opacity-90">It's free, fast, and looks beautiful on paper.</p>
        <Button asChild size="lg" variant="secondary" className="mt-6 rounded-full bg-gold text-gold-foreground hover:bg-gold/90">
          <Link to="/create">Start Creating Now <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  );
}
