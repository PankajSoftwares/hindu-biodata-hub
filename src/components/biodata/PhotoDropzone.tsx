import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Eye, EyeOff, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PhotoDropzone({
  value,
  visible,
  onChange,
  onToggleVisible,
}: {
  value?: string;
  visible: boolean;
  onChange: (v: string) => void;
  onToggleVisible: () => void;
}) {
  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      if (file.size > 4 * 1024 * 1024) {
        alert("Please choose an image under 4 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => onChange(String(reader.result || ""));
      reader.readAsDataURL(file);
    },
    [onChange],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className={`rounded-xl border border-border/60 bg-card/40 p-3 ${!visible ? "opacity-70" : ""}`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-base text-primary">Profile Photo</h3>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 gap-1 text-xs"
            onClick={onToggleVisible}
            title={visible ? "Hide photo from biodata" : "Show photo on biodata"}
          >
            {visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            {visible ? "Visible" : "Hidden"}
          </Button>
          {value && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 gap-1 text-xs text-muted-foreground hover:text-destructive"
              onClick={() => onChange("")}
            >
              <X className="h-3.5 w-3.5" /> Remove
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
          {value ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={value} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-muted-foreground">
              <ImagePlus className="h-6 w-6" />
            </div>
          )}
        </div>
        <div
          {...getRootProps()}
          className={`flex-1 cursor-pointer rounded-md border-2 border-dashed p-4 text-center text-sm transition-colors ${
            isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/60"
          }`}
        >
          <input {...getInputProps()} />
          <p className="font-medium">Drag & drop your photo</p>
          <p className="mt-1 text-xs text-muted-foreground">or click to browse · JPG/PNG up to 4MB</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Photo is optional — toggle visibility anytime.</p>
        </div>
      </div>
    </div>
  );
}
