"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, UploadCloud, X, RotateCcw } from "lucide-react";
import { InteractiveImageCrop } from "@/components/admin/InteractiveImageCrop";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  imagePositionX?: number;
  imagePositionY?: number;
  imageScale?: number;
  onUpdateCrop?: (data: { x?: number; y?: number; scale?: number }) => void;
}

export function ImageUpload({
  value,
  onChange,
  disabled,
  imagePositionX = 50,
  imagePositionY = 50,
  imageScale = 1,
  onUpdateCrop,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Upload failed");
      }

      if (data.secure_url) {
        onChange(data.secure_url);
        toast.success("Image uploaded successfully");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {value ? (
        <div className="flex flex-col items-center gap-6 p-4 rounded-xl border-2 border-dashed bg-muted/20">
          <div className="flex flex-col items-center gap-4 w-full">
            {onUpdateCrop ? (
              <InteractiveImageCrop
                src={value}
                x={imagePositionX}
                y={imagePositionY}
                scale={imageScale}
                onUpdate={onUpdateCrop}
                disabled={disabled || isUploading}
                className="w-48 h-48 sm:w-64 sm:h-64"
              />
            ) : (
              <div className="relative aspect-square w-64 rounded-full overflow-hidden border bg-muted shadow-xl">
                <img 
                  src={value} 
                  alt="Upload preview" 
                  className="object-cover w-full h-full"
                  style={{
                    objectPosition: `${imagePositionX}% ${imagePositionY}%`,
                    transform: `scale(${imageScale})`,
                  }}
                />
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="h-9 px-4 rounded-full"
                onClick={() => onChange("")}
                disabled={disabled || isUploading}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-full"
                onClick={() => onUpdateCrop?.({ x: 50, y: 50, scale: 1 })}
                disabled={disabled || isUploading}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <label className="relative border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors group">
          <div className="bg-primary/10 p-3 rounded-full">
            <UploadCloud className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Click to upload image</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (max. 5MB)</p>
          </div>
          <Input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleUpload} 
            disabled={isUploading || disabled} 
          />
        </label>
      )}
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-primary animate-pulse">
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading to Cloudinary...
        </div>
      )}
    </div>
  );
}
