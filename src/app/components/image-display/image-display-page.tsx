import { useRouter } from "next/router";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import Image from "next/image";
import PageLayout from "@/app/components/shared/page-layout";
import useImageDisplay from "@/hooks/useImageDisplay";
import content from "@/content";
import HeaderText from "../shared/header-text";

const ImageDisplayPage = () => {
  const router = useRouter();
  const { imageId: imageID } = router.query;
  console.log("imageID", imageID);

  const { imageUrl, loading, error } = useImageDisplay(imageID);

  return (
    <PageLayout>
      <HeaderText text={`${content.imageDisplay.title}: ${imageID}`} />
      <Card sx={{ width: 400, maxWidth: "100%", padding: 2 }}>
        <CardContent>
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <CircularProgress />
            </div>
          )}

          {error && (
            <Alert severity="error" style={{ marginTop: "20px" }}>
              {error}
            </Alert>
          )}

          {imageUrl && !loading && !error && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Image
                src={imageUrl}
                alt={`Image ${imageID}`}
                width={300}
                height={300}
              />
            </div>
          )}

          {!imageUrl && !loading && !error && (
            <Typography variant="body2" color="textSecondary" align="center">
              {content.imageDisplay.error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ImageDisplayPage;