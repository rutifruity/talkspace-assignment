"use client";

import React from "react";
import content from "@/content";
import PageLayout from "../shared/page-layout";
import HeaderText from "../shared/header-text";
import UploadCard from "./upload-card";

const ImageUploadPage = () => {
  return (
    <PageLayout>
      <HeaderText text={content.imageUpload.title} />
      <UploadCard />
    </PageLayout>
  );
};

export default ImageUploadPage;
