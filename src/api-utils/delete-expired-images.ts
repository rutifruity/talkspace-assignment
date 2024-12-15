import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Function to delete expired images
const deleteExpiredImages = async () => {
  const currentTime = new Date();

  // Fetch images that have expired
  const expiredImages = await prisma.image.findMany({
    where: {
      expiresAt: {
        lt: currentTime, // Images with expiration date less than the current time
      },
    },
  });

  // Loop through each expired image
  for (const image of expiredImages) {
    // Delete the image from the database
    await prisma.image.delete({
      where: { id: image.id },
    });

    // Delete the image file from the "uploads" directory
    const filePath = path.join(process.cwd(), "public", image.url);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the file from the file system
        console.log(`Deleted image: ${image.url}`);
      }
    } catch (err) {
      console.error(`Failed to delete image file: ${image.url}`, err);
    }
  }

  console.log(`Deleted ${expiredImages.length} expired images.`);
};

export default deleteExpiredImages;
