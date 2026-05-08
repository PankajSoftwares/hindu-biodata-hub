import type { Biodata, TemplateId } from "@/lib/biodata";
import { TraditionalTemplate } from "./templates/Traditional";
import { ModernTemplate } from "./templates/Modern";
import { ElegantTemplate } from "./templates/Elegant";

export function BiodataPreview({
  data,
  template,
  id,
}: {
  data: Biodata;
  template: TemplateId;
  id?: string;
}) {
  return (
    <div id={id}>
      {template === "traditional" && <TraditionalTemplate data={data} />}
      {template === "modern" && <ModernTemplate data={data} />}
      {template === "elegant" && <ElegantTemplate data={data} />}
    </div>
  );
}