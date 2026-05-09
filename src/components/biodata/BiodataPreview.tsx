import type { BiodataDoc, TemplateId } from "@/lib/biodata";
import { TraditionalTemplate } from "./templates/Traditional";
import { ModernTemplate } from "./templates/Modern";
import { ElegantTemplate } from "./templates/Elegant";

export function BiodataPreview({
  doc,
  template,
  id,
}: {
  doc: BiodataDoc;
  template: TemplateId;
  id?: string;
}) {
  return (
    <div id={id}>
      {template === "traditional" && <TraditionalTemplate doc={doc} />}
      {template === "modern" && <ModernTemplate doc={doc} />}
      {template === "elegant" && <ElegantTemplate doc={doc} />}
    </div>
  );
}
