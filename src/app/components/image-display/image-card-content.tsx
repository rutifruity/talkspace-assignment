import { Image as PrismaImage } from "@prisma/client";
import React from "react";
import content from "@/content";
import Image from "next/image";
import { Typography, Box } from "@mui/material";
import { calculateDaysLeft } from "./utils";

export default function ImageCardContent({
  image,
  imageID,
}: {
  image: PrismaImage;
  imageID: string;
}) {
  const daysLeft = calculateDaysLeft(image.expiresAt);

  return (
    <>
      <Typography variant="h5" component="div">
        {`${content.imageDisplay.title}: ${imageID}`}
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <Image
          src={image.url}
          alt={`Image ${imageID}`}
          width={300}
          height={300}
        />
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          {content.imageDisplay.expirationMessage(daysLeft)}
        </Typography>
      </Box>
    </>
  );
}
