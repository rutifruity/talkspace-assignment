import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import content from "@/content";

export const getImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { imageID } = req.query;

    const image = await prisma.image.findUnique({
      where: { id: imageID as string },
      select: { url: true, expiresAt: true },
    });

    if (!image) {
      return res.status(404).json({ error: content.server.imageNotFound });
    }
    if (image.url) {
      return res
        .status(200)
        .json({ message: content.server.imageFound, image });
    } else {
      return res.status(404).json({ error: content.server.imageFileNotFound });
    }
  } catch (error) {
    console.error(content.server.getImageError, error);
    return res.status(500).json({ error: content.server.internalServerError });
  }
};
