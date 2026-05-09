import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Eye, FileText, Printer, RotateCcw, Sparkles, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BiodataForm } from "@/components/biodata/BiodataForm";
import { BiodataPreview } from "@/components/biodata/BiodataPreview";
import { useBiodataDraft } from "@/hooks/use-biodata-draft";
import { TEMPLATES, type TemplateId } from "@/lib/biodata";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create Your Biodata — Free Biodata for Hindus" },
      { name: "description", content: "Fill in your details, hide what you don't need, add custom fields, and watch your biodata update live." },
    ],
  }),
  component: CreatePage,
});

function CreatePage() {
  const draft = useBiodataDraft();
  const { doc, template, setTemplate, savedAt, reset, loadSample } = draft;
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");
  const [downloading, setDownloading] = useState(false);

  const filled = useMemo(() => {
    const list = Object.values(doc.fields);
    if (list.length === 0) return 0;
    const done = list.filter((f) => f.visible && f.value.trim().length > 0).length;
    const visibleCount = list.filter((f) => f.visible).length || list.length;
    return Math.round((done / visibleCount) * 100);
  }, [doc]);

  const fullName = doc.fields.fullName?.value || "";

  async function handleDownload() {
    setDownloading(true);
    try {
      const el = document.getElementById("biodata-print");
      if (!el) return;
      const mod = await import("html2pdf.js");
      const html2pdf = mod.default || (mod as any);
      const opts: any = {
        margin: 0,
        filename: `${(fullName || "biodata").replace(/\s+/g, "_")}_biodata.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };
      await html2pdf().set(opts).from(el).save();
      toast.success("Biodata downloaded");
    } catch (e) {
      console.error(e);
      toast.error("Could not generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleSample() {
    loadSample();
    toast.success("Loaded sample biodata");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card/60 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl text-primary">Create your biodata</h1>
          <p className="text-xs text-muted-foreground">
            Auto-saved in your browser ·{" "}
            <span className="text-foreground/70">
              {savedAt ? `Last saved ${new Date(savedAt).toLocaleTimeString()}` : "Not saved yet"}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSample}>
            <Sparkles className="mr-1.5 h-4 w-4" /> Try sample
          </Button>
          <Button variant="outline" size="sm" onClick={() => { reset(); toast("Form cleared"); }}>
            <RotateCcw className="mr-1.5 h-4 w-4" /> Reset
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-1.5 h-4 w-4" /> Print
          </Button>
          <Button size="sm" onClick={handleDownload} disabled={downloading}>
            <Download className="mr-1.5 h-4 w-4" />
            {downloading ? "Generating..." : "Download PDF"}
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Template</span>
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id as TemplateId)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-all",
              template === t.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/60",
            )}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Profile completion</span>
          <span>{filled}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-gradient-to-r from-primary to-gold transition-all" style={{ width: `${filled}%` }} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-1 rounded-md border border-border p-1 text-xs md:hidden">
        <button
          onClick={() => setMobileView("form")}
          className={cn("rounded py-2", mobileView === "form" && "bg-primary text-primary-foreground")}
        >
          <FileText className="mr-1 inline h-3.5 w-3.5" /> Form
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={cn("rounded py-2", mobileView === "preview" && "bg-primary text-primary-foreground")}
        >
          <Eye className="mr-1 inline h-3.5 w-3.5" /> Preview
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.05fr]">
        <div className={cn("md:block", mobileView === "form" ? "block" : "hidden")}>
          <div className="sticky top-20 mb-4 hidden flex-wrap gap-1 rounded-md border border-border bg-card/60 p-1 text-xs md:flex">
            {doc.sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="rounded-xl border border-border/70 bg-card/40 p-5">
            <BiodataForm
              doc={doc}
              onSetValue={draft.setFieldValue}
              onSetLabel={draft.setFieldLabel}
              onToggleVisible={draft.toggleFieldVisible}
              onRemove={draft.removeField}
              onAddCustom={draft.addCustomField}
              onMove={draft.moveField}
              photo={doc.photo}
              onSetPhoto={draft.setPhoto}
              onTogglePhoto={draft.togglePhotoVisible}
            />
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Save className="h-3.5 w-3.5" /> Changes are saved automatically. Drag <span className="font-medium">⋮⋮</span> to reorder · click the eye to hide a field · use “Add detail” for custom fields.
            </div>
          </div>
        </div>

        <div className={cn("md:block", mobileView === "preview" ? "block" : "hidden")}>
          <div className="sticky top-20">
            <div className="overflow-x-auto rounded-xl border border-border/70 bg-[#eee5d3]/50 p-4">
              <div className="origin-top scale-[0.85] sm:scale-90 md:scale-100">
                <BiodataPreview id="biodata-print" doc={doc} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
