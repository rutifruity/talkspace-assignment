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

const ImagePage = () => {
  const router = useRouter();
  const { imageId: imageID } = router.query;

  const { imageUrl, loading, error } = useImageDisplay(imageID);

  return (
    <PageLayout>
      <Card sx={{ width: 400, maxWidth: "100%", padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Image ID: {imageID}
          </Typography>

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
              No image available
            </Typography>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ImagePage;
