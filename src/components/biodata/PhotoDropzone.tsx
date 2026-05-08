import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, X } from "lucide-react";

export function PhotoDropzone({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
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
    <div className="flex items-start gap-4">
      <div className="relative h-28 w-24 overflow-hidden rounded-md border border-border bg-muted">
        {value ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={value} alt="Profile" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/80 text-foreground shadow"
              aria-label="Remove photo"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
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
      </div>
    </div>
  );
}