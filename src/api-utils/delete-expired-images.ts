import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

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

    for (const image of expiredImages) {
      const filePath = path.join(process.cwd(), "public", image.url);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await prisma.image.delete({
        where: {
          id: image.id,
        },
      });
    }

    console.log(`Deleted ${expiredImages.length} expired images.`);
  } catch (error) {
    console.error("Error deleting expired images:", error);
  }
};

export default deleteExpiredImages;
