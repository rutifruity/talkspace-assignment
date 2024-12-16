import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import content from "@/content";

const uploadsDir = path.join(process.cwd(), "public", "uploads");

function validateExpiresAt(expiresAt: any, res) {
  const currentDate = new Date();
  const expiredDate = new Date(expiresAt);

  if (expiredDate < currentDate) {
    return res
      .status(400)
      .json({ error: content.server.saveImageExpiredByError });
  }
}

export const saveImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const file = (req as any).file;
    const { expiresAt } = req.body;

    if (!file || !expiresAt) {
      return res.status(400).json({ error: content.server.missingData });
    }

    validateExpiresAt(expiresAt, res);

    const uniqueId = uuidv4();
    const fileExtension = path.extname(file.originalname);
    const targetPath = path.join(uploadsDir, `${uniqueId}${fileExtension}`);

    fs.renameSync(file.path, targetPath);

    const image = await prisma.image.create({
      data: {
        url: `/uploads/${uniqueId}${fileExtension}`,
        expiresAt: new Date(expiresAt),
      },
    });

    return res.status(201).json({
      message: content.server.saveImageSuccess,
      url: `http://localhost:3000/image/image-display?imageId=${image.id}`,
    });
  } catch (error) {
    console.error(content.server.saveImageError, error);
    return res.status(500).json({ error: content.server.internalServerError });
  }
};
