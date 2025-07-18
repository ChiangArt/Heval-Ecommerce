import { useState } from "react";
import { upload } from "@/core/upload/action/upload.actions";

export function useImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const newFiles = Array.from(fileList);
    setFiles((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const uploadFiles = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const url = await upload(file, "products");
      urls.push(url);
    }
    return urls;
  };

  const resetImages = () => {
    setFiles([]);
    setPreviews([]);
  };

  return {
    files,
    previews,
    handleFileChange,
    uploadFiles,
    resetImages,
  };
}
