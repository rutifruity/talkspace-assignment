import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { saveImage } from "@/api-utils/saveImage";

const upload = multer({ dest: "public/uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    await runMiddleware(req, res, upload.single("file"));
    return saveImage(req, res);
  }
  if (req.method === "GET") {
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
