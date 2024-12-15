"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import content from "@/content";
import UploadCard from "./components/upload-page/upload-card";

const ImageUploadPage = () => {
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
        {content.imageUpload.title}
      </Typography>
      <UploadCard />
    </Box>
  );
};

export default ImageUploadPage;
