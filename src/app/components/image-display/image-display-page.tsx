import React from "react";
import PageLayout from "@/app/components/shared/page-layout";
import content from "@/content";
import useImageDisplay from "@/hooks/useImageDisplay";
import { Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import AlertComponent from "./alert";
import ImageCardContent from "./image-card-content";
import Loading from "./loading";

const ImageDisplayPage = () => {
  const router = useRouter();
  const { imageId: imageID } = router.query;

  const { image, loading, error } = useImageDisplay(imageID);

  return (
    <PageLayout>
      <Card sx={{ width: 400, maxWidth: "100%", padding: 2 }}>
        <CardContent>
          {loading && <Loading />}

          {error && <AlertComponent error={error} />}

          {image && !loading && !error && (
            <ImageCardContent image={image} imageID={imageID as string} />
          )}

          {!image && !loading && !error && (
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
