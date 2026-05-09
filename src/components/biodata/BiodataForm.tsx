import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Eye, EyeOff, GripVertical, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PhotoDropzone } from "./PhotoDropzone";
import type { BiodataDoc, FieldDef, SectionId } from "@/lib/biodata";

type Props = {
  doc: BiodataDoc;
  onSetValue: (id: string, v: string) => void;
  onSetLabel: (id: string, v: string) => void;
  onToggleVisible: (id: string) => void;
  onRemove: (id: string) => void;
  onAddCustom: (sectionId: SectionId) => string;
  onMove: (fieldId: string, toSection: SectionId, toIndex: number) => void;
  photo: { value: string; visible: boolean };
  onSetPhoto: (v: string) => void;
  onTogglePhoto: () => void;
};

export function BiodataForm(props: Props) {
  const {
    doc,
    onSetValue,
    onSetLabel,
    onToggleVisible,
    onRemove,
    onAddCustom,
    onMove,
    photo,
    onSetPhoto,
    onTogglePhoto,
  } = props;

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const [activeId, setActiveId] = useState<string | null>(null);

  // Build a flat lookup of which section owns each field (for cross-section moves).
  function sectionOfField(id: string): SectionId | null {
    for (const s of doc.sections) if (s.fieldIds.includes(id)) return s.id;
    return null;
  }

  function handleDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;
    const fromId = String(active.id);
    const overId = String(over.id);
    if (fromId === overId) return;

    const fromSection = sectionOfField(fromId);
    if (!fromSection) return;

    // Dropped onto a section's empty area (id is "section:<sid>")
    if (overId.startsWith("section:")) {
      const toSection = overId.slice("section:".length) as SectionId;
      const target = doc.sections.find((s) => s.id === toSection);
      if (!target) return;
      onMove(fromId, toSection, target.fieldIds.length);
      return;
    }

    const toSection = sectionOfField(overId);
    if (!toSection) return;

    if (fromSection === toSection) {
      const ids = doc.sections.find((s) => s.id === fromSection)!.fieldIds;
      const oldIndex = ids.indexOf(fromId);
      const newIndex = ids.indexOf(overId);
      if (oldIndex === -1 || newIndex === -1) return;
      const reordered = arrayMove(ids, oldIndex, newIndex);
      onMove(fromId, fromSection, reordered.indexOf(fromId));
    } else {
      const targetIds = doc.sections.find((s) => s.id === toSection)!.fieldIds;
      const targetIndex = targetIds.indexOf(overId);
      onMove(fromId, toSection, targetIndex >= 0 ? targetIndex : targetIds.length);
    }
  }

  const activeField = activeId ? doc.fields[activeId] : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-8">
        <PhotoDropzone
          value={photo.value}
          visible={photo.visible}
          onChange={onSetPhoto}
          onToggleVisible={onTogglePhoto}
        />

        {doc.sections.map((section) => (
          <SectionBlock
            key={section.id}
            id={section.id}
            label={section.label}
            fieldIds={section.fieldIds}
            fields={doc.fields}
            onSetValue={onSetValue}
            onSetLabel={onSetLabel}
            onToggleVisible={onToggleVisible}
            onRemove={onRemove}
            onAddCustom={() => onAddCustom(section.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeField ? (
          <div className="rounded-md border border-primary/40 bg-card px-3 py-2 text-sm shadow-lg">
            {activeField.label || "Field"}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function SectionBlock({
  id,
  label,
  fieldIds,
  fields,
  onSetValue,
  onSetLabel,
  onToggleVisible,
  onRemove,
  onAddCustom,
}: {
  id: SectionId;
  label: string;
  fieldIds: string[];
  fields: Record<string, FieldDef>;
  onSetValue: (id: string, v: string) => void;
  onSetLabel: (id: string, v: string) => void;
  onToggleVisible: (id: string) => void;
  onRemove: (id: string) => void;
  onAddCustom: () => void;
}) {
  // The section itself is a droppable target via a sentinel sortable id.
  return (
    <section id={id}>
      <div className="mb-3 flex items-center gap-3">
        <h3 className="font-display text-lg text-primary">{label}</h3>
        <span className="h-px flex-1 bg-gold/40" />
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 gap-1 text-xs text-primary hover:bg-primary/10"
          onClick={onAddCustom}
        >
          <Plus className="h-3.5 w-3.5" /> Add detail
        </Button>
      </div>

      <SortableContext items={[...fieldIds, `section:${id}`]} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {fieldIds.length === 0 && (
            <SectionDropZone id={`section:${id}`} />
          )}
          {fieldIds.map((fid) => {
            const f = fields[fid];
            if (!f) return null;
            return (
              <FieldRow
                key={fid}
                field={f}
                onSetValue={onSetValue}
                onSetLabel={onSetLabel}
                onToggleVisible={onToggleVisible}
                onRemove={onRemove}
              />
            );
          })}
          {fieldIds.length > 0 && <SectionDropZone id={`section:${id}`} compact />}
        </div>
      </SortableContext>
    </section>
  );
}

function SectionDropZone({ id, compact }: { id: string; compact?: boolean }) {
  const { setNodeRef, isOver } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`rounded-md border border-dashed text-center text-[11px] uppercase tracking-widest text-muted-foreground transition-colors ${
        compact ? "py-2" : "py-6"
      } ${isOver ? "border-primary/60 bg-primary/5 text-primary" : "border-border/60"}`}
    >
      Drop fields here
    </div>
  );
}

function FieldRow({
  field,
  onSetValue,
  onSetLabel,
  onToggleVisible,
  onRemove,
}: {
  field: FieldDef;
  onSetValue: (id: string, v: string) => void;
  onSetLabel: (id: string, v: string) => void;
  onToggleVisible: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const dim = !field.visible ? "opacity-60" : "";
  const isLong = field.kind === "longtext";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative grid grid-cols-[24px_minmax(0,11rem)_minmax(0,1fr)_auto] items-start gap-2 rounded-md border border-border/60 bg-card/40 p-2 ${dim}`}
    >
      <button
        type="button"
        className="mt-1 grid h-6 w-6 cursor-grab touch-none place-items-center text-muted-foreground hover:text-foreground active:cursor-grabbing"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <Input
        value={field.label}
        onChange={(e) => onSetLabel(field.id, e.target.value)}
        placeholder="Label"
        className="h-9 text-xs"
      />

      {isLong ? (
        <Textarea
          value={field.value}
          onChange={(e) => onSetValue(field.id, e.target.value)}
          rows={3}
          placeholder="Value"
          className="text-sm"
        />
      ) : (
        <Input
          type={field.kind === "date" ? "date" : field.kind === "email" ? "email" : field.kind === "tel" ? "tel" : "text"}
          value={field.value}
          onChange={(e) => onSetValue(field.id, e.target.value)}
          placeholder="Value"
          className="h-9 text-sm"
        />
      )}

      <div className="flex items-center gap-1">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={() => onToggleVisible(field.id)}
          aria-label={field.visible ? "Hide field" : "Show field"}
          title={field.visible ? "Hide from biodata" : "Show on biodata"}
        >
          {field.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={() => onRemove(field.id)}
          aria-label="Remove field"
          title={field.custom ? "Delete custom field" : "Delete field"}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
