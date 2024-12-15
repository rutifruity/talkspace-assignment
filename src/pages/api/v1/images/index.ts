import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma.js";

// Configure Multer for file uploads
const upload = multer({ dest: "public/uploads/" });

// Middleware to handle file uploads
export const config = {
  api: {
    bodyParser: false, // Disable Next.js' default body parser
  },
};

// Promisify multer to work with Next.js
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Run multer middleware to handle file uploads
      await runMiddleware(req, res, upload.single("file"));

      const file = (req as any).file; // Access uploaded file
      const { expiresAt } = req.body; // Get expiration time from request

      if (!file || !expiresAt) {
        return res
          .status(400)
          .json({ error: "File or expiration time is missing." });
      }

      // Move the file to the desired location
      const targetPath = path.join(
        process.cwd(),
        "public/uploads",
        file.originalname
      );
      fs.renameSync(file.path, targetPath);

      // Save image metadata to the database
      const image = await prisma.image.create({
        data: {
          url: `/uploads/${file.originalname}`,
          expiresAt: new Date(expiresAt),
        },
      });

      return res
        .status(201)
        .json({ message: "Image uploaded successfully!", url: image.url });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
