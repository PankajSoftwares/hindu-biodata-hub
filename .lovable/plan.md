## Goal
Turn the biodata editor into a flexible, SaaS-style form builder: every field optional, toggleable visibility, custom user-added fields, drag-and-drop reordering across sections, optional photo, and templates that adapt automatically.

## Data model changes (`src/lib/biodata.ts`)

Introduce a new structure alongside the existing `Biodata` type:

```ts
type FieldId = string; // e.g. "fullName", "custom_abc123"
type SectionId = "personal" | "religion" | "career" | "family" | "horoscope" | "lifestyle" | "contact";

type FieldDef = {
  id: FieldId;
  label: string;        // editable for custom, fixed for built-in (but renameable)
  value: string;
  visible: boolean;
  multiline?: boolean;
  custom?: boolean;     // user-added
  kind?: "text" | "date" | "email" | "photo";
};

type Section = {
  id: SectionId;
  label: string;
  fieldIds: FieldId[];
};

type BiodataDoc = {
  fields: Record<FieldId, FieldDef>;
  sections: Section[];
  photo?: { value: string; visible: boolean };
};
```

Provide migration: convert existing flat `Biodata` into `BiodataDoc` on load (idempotent).

## Editor (`src/components/biodata/BiodataForm.tsx` rewrite)

- Sections rendered as collapsible cards.
- Each field row:
  - Drag handle (move within / across sections)
  - Eye toggle (show/hide)
  - Inline-editable label (contenteditable input)
  - Value input (textarea if multiline)
  - Trash button (custom fields only) / hide button (built-in)
- Per-section "Add More Details" button → spawns custom field with editable label + value.
- Photo card at top: upload, remove, visibility toggle.
- Drag-and-drop powered by `@dnd-kit/core` + `@dnd-kit/sortable` (install).

## Templates (`Traditional`, `Modern`, `Elegant`)

Refactor to iterate over `doc.sections` → `section.fieldIds` → render only `visible && value.trim()`. Skip empty sections entirely. Photo column collapses to single-column when hidden/missing. Custom fields render exactly like built-ins using `field.label` + `field.value`.

Shared `shared.tsx` row helpers updated to accept `(label, value)` pairs derived from the new doc.

## Hook (`useBiodataDraft`)

- Stores `BiodataDoc` instead of flat `Biodata`.
- Migrates old localStorage payload on first load.
- Exposes: `toggleField`, `renameField`, `setValue`, `addCustomField(sectionId)`, `removeField`, `moveField(fieldId, toSection, toIndex)`, `setPhoto`, `togglePhoto`.

## PDF export

No changes needed — it already snapshots the rendered preview, which now respects visibility.

## Hydration fix (drive-by)

Fix the SSR mismatch on the home hero ("Hindu Marriage" vs "Hindu") — leftover stale prerender; ensure hero text is just "Hindu" everywhere.

## Out of scope (this pass)
- Reordering sections themselves (only fields move between/within sections).
- Adding/removing entire custom sections.
- Multi-language labels.

## Files touched
- `src/lib/biodata.ts` (new doc model + migration)
- `src/hooks/use-biodata-draft.ts` (rewrite around doc)
- `src/components/biodata/BiodataForm.tsx` (rewrite as field-builder)
- `src/components/biodata/PhotoDropzone.tsx` (add visibility toggle + remove)
- `src/components/biodata/templates/{Traditional,Modern,Elegant,shared}.tsx` (data-driven render)
- `src/routes/create.tsx` (wire new hook API)
- `src/routes/index.tsx` (hero text fix if needed)
- `package.json` (+ `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`)
