"use client";

import React, { useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Upload, X, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploadProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  maxImages?: number;
}

const ImageUpload = ({
  value,
  onChange,
  multiple = false,
  maxImages = 10,
}: ImageUploadProps) => {
  const valueArray = Array.isArray(value) ? value : value ? [value] : [];
  const maxFiles = multiple ? maxImages : 1;

  // Cleanup body overflow when component unmounts or widget closes
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const removeImage = (urlToRemove: string) => {
    const newArray = valueArray.filter((url) => url !== urlToRemove);
    if (multiple) {
      onChange(newArray);
    } else {
      onChange(newArray[0] || "");
    }
  };

  const handleUploadSuccess = (result: any) => {
    // Ensure body overflow is reset
    document.body.style.overflow = 'unset';
    
    const uploaded = Array.isArray(result?.info)
      ? result.info.map((file: any) => file.secure_url)
      : [result?.info?.secure_url];

    const newImages = [...new Set(uploaded.filter(Boolean))];

    if (multiple) {
      // Use functional update to access latest state
      onChange((prev: string[]) => {
        const prevArray = Array.isArray(prev) ? prev : prev ? [prev] : [];
        return [...new Set([...prevArray, ...newImages])].slice(0, maxImages);
      });
    } else {
      onChange(newImages[0] || "");
    }
  };

  const handleUploadError = (error: any) => {
    // Ensure body overflow is reset on error
    document.body.style.overflow = 'unset';
    console.error('Upload error:', error);
  };

  return (
    <div className="space-y-4">
      <div className={`grid gap-4 mb-4 ${multiple ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7' : 'grid-cols-1 max-w-xs'}`}>
        {valueArray.length < maxFiles && (
          <CldUploadWidget
            uploadPreset="lg0dlgjw"
            options={{
              sources: ["local", "url", "camera", "unsplash"],
              multiple: multiple,
              maxFiles: maxFiles,
              maxFileSize: 10000000, // 10MB
              clientAllowedFormats: [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "webp",
                "svg",
              ],
              resourceType: "image",
            }}
            onSuccess={handleUploadSuccess}
            onError={handleUploadError}
            onClose={() => {
              // Reset body overflow when widget closes
              document.body.style.overflow = 'unset';
            }}
          >
            {({ open }) => (
              <Button
                type="button"
                variant="outline"
                className="aspect-square flex flex-col items-center justify-center border-dashed gap-2 border-black/40 dark:border-gray-400 h-full min-h-[120px]"
                onClick={() => {
                  // Reset overflow before opening
                  document.body.style.overflow = 'unset';
                  open();
                }}
              >
                <ImagePlus className="h-6 w-6" />
                <span className="text-xs text-center">Upload image</span>
              </Button>
            )}
          </CldUploadWidget>
        )}

        {valueArray.map((url, index) => (
          <Card
            key={url}
            className="relative group overflow-hidden aspect-square p-0 border-dashed"
          >
            <div className="relative h-full w-full">
              <Image
                src={url}
                alt={`${multiple ? 'Product' : 'Category'} image ${index + 1}`}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => removeImage(url)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {valueArray.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {valueArray.length} of {maxFiles} {multiple ? 'images' : 'image'} uploaded
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
