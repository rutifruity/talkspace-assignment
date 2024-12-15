"use client";

import React from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import useImageUpload from "@/hooks/useImageUpload";
import content from "@/content";

const UploadCard = () => {
  const {
    selectedFile,
    expiration,
    uploading,
    uploadResult,
    setExpiration,
    handleFileChange,
    handleUpload,
  } = useImageUpload();

  return (
    <Card
      sx={{
        width: "400px",
        boxShadow: 3,
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" gap="20px">
          <Button variant="contained" component="label">
            {content.imageUpload.fileLabel}
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          {selectedFile && (
            <Typography variant="body1">
              {`${content.imageUpload.fileSelection}: ${selectedFile.name}`}
            </Typography>
          )}

          <TextField
            label={content.imageUpload.expirationLabel}
            type="datetime-local"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            InputProps={{
              inputProps: {
                min: new Date().toISOString().slice(0, 16),
              },
            }}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={uploading || !selectedFile || !expiration}
          >
            {uploading ? (
              <CircularProgress size={24} />
            ) : (
              content.imageUpload.uploadButton
            )}
          </Button>

          {uploadResult && (
            <Typography variant="body1" color="success.main">
              {content.imageUpload.successMessage}:{" "}
              <a href={uploadResult} target="_blank" rel="noopener noreferrer">
                {uploadResult}{" "}
              </a>
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UploadCard;
