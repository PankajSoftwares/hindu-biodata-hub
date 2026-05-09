import { useEffect, useRef, useState, useCallback } from "react";
import {
  type BiodataDoc,
  type SectionId,
  type TemplateId,
  emptyDoc,
  sampleDoc,
  newCustomField,
  migrateLegacy,
} from "@/lib/biodata";

const KEY = "fbh:biodata-doc-v2";
const LEGACY_KEY = "fbh:biodata-draft-v1";

type Persisted = {
  doc: BiodataDoc;
  template: TemplateId;
  updatedAt: number;
};

function readStored(): Persisted | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Persisted;
    const legacyRaw = localStorage.getItem(LEGACY_KEY);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      const doc = migrateLegacy(legacy?.data ?? {});
      return { doc, template: legacy?.template ?? "traditional", updatedAt: Date.now() };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function useBiodataDraft() {
  const [doc, setDoc] = useState<BiodataDoc>(() => emptyDoc());
  const [template, setTemplate] = useState<TemplateId>("traditional");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const s = readStored();
    if (s) {
      setDoc(s.doc);
      setTemplate(s.template ?? "traditional");
      setSavedAt(s.updatedAt);
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const t = setTimeout(() => {
      const updatedAt = Date.now();
      try {
        localStorage.setItem(KEY, JSON.stringify({ doc, template, updatedAt }));
        setSavedAt(updatedAt);
      } catch {
        /* quota exceeded — silently ignore */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [doc, template]);

  const setFieldValue = useCallback((id: string, value: string) => {
    setDoc((d) => ({ ...d, fields: { ...d.fields, [id]: { ...d.fields[id], value } } }));
  }, []);

  const setFieldLabel = useCallback((id: string, label: string) => {
    setDoc((d) => ({ ...d, fields: { ...d.fields, [id]: { ...d.fields[id], label } } }));
  }, []);

  const toggleFieldVisible = useCallback((id: string) => {
    setDoc((d) => ({
      ...d,
      fields: { ...d.fields, [id]: { ...d.fields[id], visible: !d.fields[id].visible } },
    }));
  }, []);

  const removeField = useCallback((id: string) => {
    setDoc((d) => {
      const fields = { ...d.fields };
      delete fields[id];
      const sections = d.sections.map((s) => ({
        ...s,
        fieldIds: s.fieldIds.filter((fid) => fid !== id),
      }));
      return { ...d, fields, sections };
    });
  }, []);

  const addCustomField = useCallback((sectionId: SectionId) => {
    const f = newCustomField("New Detail", "");
    setDoc((d) => ({
      ...d,
      fields: { ...d.fields, [f.id]: f },
      sections: d.sections.map((s) =>
        s.id === sectionId ? { ...s, fieldIds: [...s.fieldIds, f.id] } : s,
      ),
    }));
    return f.id;
  }, []);

  const moveField = useCallback(
    (fieldId: string, toSectionId: SectionId, toIndex: number) => {
      setDoc((d) => {
        let removedFrom: SectionId | null = null;
        const sections = d.sections.map((s) => {
          if (s.fieldIds.includes(fieldId)) {
            removedFrom = s.id;
            return { ...s, fieldIds: s.fieldIds.filter((id) => id !== fieldId) };
          }
          return s;
        });
        const final = sections.map((s) => {
          if (s.id !== toSectionId) return s;
          const ids = [...s.fieldIds];
          const clamped = Math.max(0, Math.min(toIndex, ids.length));
          ids.splice(clamped, 0, fieldId);
          return { ...s, fieldIds: ids };
        });
        // unused but keeps closure clean
        void removedFrom;
        return { ...d, sections: final };
      });
    },
    [],
  );

  const setPhoto = useCallback((value: string) => {
    setDoc((d) => ({ ...d, photo: { ...d.photo, value } }));
  }, []);

  const togglePhotoVisible = useCallback(() => {
    setDoc((d) => ({ ...d, photo: { ...d.photo, visible: !d.photo.visible } }));
  }, []);

  const reset = useCallback(() => {
    setDoc(emptyDoc());
    setTemplate("traditional");
    if (typeof window !== "undefined") localStorage.removeItem(KEY);
    setSavedAt(null);
  }, []);

  const loadSample = useCallback(() => {
    setDoc(sampleDoc());
  }, []);

  return {
    doc,
    setDoc,
    template,
    setTemplate,
    savedAt,
    setFieldValue,
    setFieldLabel,
    toggleFieldVisible,
    removeField,
    addCustomField,
    moveField,
    setPhoto,
    togglePhotoVisible,
    reset,
    loadSample,
  };
}
