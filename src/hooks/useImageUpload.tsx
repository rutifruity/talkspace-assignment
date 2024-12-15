import { useState } from "react";
import content from "@/content";

const useImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expiration, setExpiration] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !expiration) {
      alert(content.imageUpload.selectFileWarning);
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("expiresAt", expiration);

      const response = await fetch("/api/v1/images", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadResult(result.url);
      } else {
        alert(result.error || content.imageUpload.errorMessage);
      }
    } catch (error) {
      console.error(`${content.imageUpload.errorConsole}: `, error);
      alert(content.imageUpload.errorConsole);
    } finally {
      setUploading(false);
    }
  };

  return {
    selectedFile,
    expiration,
    uploading,
    uploadResult,
    setExpiration,
    handleFileChange,
    handleUpload,
  };
};

export default useImageUpload;
