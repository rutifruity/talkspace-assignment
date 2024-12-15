"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const ImageUploadPage = () => {
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
      alert("Please select a file and set an expiration time.");
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
        alert(result.error || "Failed to upload the image.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding="20px"
    >
      <Typography variant="h4" marginBottom="20px">
        Image Upload
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        width="100%"
      >
        <Button variant="contained" component="label">
          Select Image
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/*"
          />
        </Button>
        {selectedFile && (
          <Typography variant="body1">
            Selected File: {selectedFile.name}
          </Typography>
        )}

        <TextField
          type="datetime-local"
          label="Expiration Time"
          InputLabelProps={{ shrink: true }}
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={uploading || !selectedFile || !expiration}
        >
          {uploading ? <CircularProgress size={24} /> : "Upload"}
        </Button>

        {uploadResult && (
          <Typography variant="body1" color="success.main">
            Upload successful! Shareable link:{" "}
            <a href={uploadResult}>{uploadResult}</a>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImageUploadPage;
