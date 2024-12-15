"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import content from "@/content";
import UploadCard from "./components/upload-page/upload-card";
import PageLayout from "./components/shared/page-layout";

const ImageUploadPage = () => {
  return (
    <PageLayout>
      <Typography variant="h4" marginBottom="20px">
        {content.imageUpload.title}
      </Typography>
      <UploadCard />
    </PageLayout>
  );
};

export default ImageUploadPage;
