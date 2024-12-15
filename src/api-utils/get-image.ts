import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export const getImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { imageID } = req.query;

    const image = await prisma.image.findUnique({
      where: { id: imageID as string },
      select: { url: true, expiresAt: true },
    });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    if (image.url) {
      return res
        .status(200)
        .json({ message: "Successfully found image path", url: image.url });
    } else {
      return res.status(404).json({ error: "Image file not found" });
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
