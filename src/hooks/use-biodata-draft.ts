import { useEffect, useRef, useState } from "react";
import { type Biodata, emptyBiodata, type TemplateId } from "@/lib/biodata";

const KEY = "fbh:biodata-draft-v1";

export type Draft = {
  data: Biodata;
  template: TemplateId;
  updatedAt: number;
};

function readDraft(): Draft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Draft;
  } catch {
    return null;
  }
}

export function useBiodataDraft() {
  const [data, setData] = useState<Biodata>(emptyBiodata);
  const [template, setTemplate] = useState<TemplateId>("traditional");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const d = readDraft();
    if (d) {
      setData({ ...emptyBiodata, ...d.data });
      setTemplate(d.template ?? "traditional");
      setSavedAt(d.updatedAt);
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const t = setTimeout(() => {
      const updatedAt = Date.now();
      try {
        localStorage.setItem(KEY, JSON.stringify({ data, template, updatedAt }));
        setSavedAt(updatedAt);
      } catch {
        /* quota exceeded — silently ignore */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [data, template]);

  function update<K extends keyof Biodata>(key: K, value: Biodata[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setData(emptyBiodata);
    setTemplate("traditional");
    localStorage.removeItem(KEY);
    setSavedAt(null);
  }

  function loadSample(sample: Biodata) {
    setData(sample);
  }

  return { data, setData, template, setTemplate, savedAt, update, reset, loadSample };
}