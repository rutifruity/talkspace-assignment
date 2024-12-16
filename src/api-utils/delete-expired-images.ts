import { Image, PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

function deleteImagesFromPublicFolder(expiredImages: Image[]): void {
  expiredImages.map((image: Image) => {
    if (fs.existsSync(image.url)) {
      fs.unlinkSync(image.url);
    }
  });
}

async function deleteImagesFromPrisma(expiredImages: Image[]): Promise<void> {
  const ids = expiredImages.map((image) => image.id);

  await prisma.image.deleteMany({
    where: {
      id: { in: ids },
    },
  });
}

const deleteExpiredImages = async () => {
  const currentTime = new Date();

  try {
    const expiredImages = await prisma.image.findMany({
      where: {
        expiresAt: {
          lt: currentTime,
        },
      },
    });

    await deleteImagesFromPrisma(expiredImages);

    deleteImagesFromPublicFolder(expiredImages);

    console.log(`Deleted ${expiredImages.length} expired images.`);
  } catch (error) {
    console.error("Error deleting expired images:", error);
  }
};

export default deleteExpiredImages;
