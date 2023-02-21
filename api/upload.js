import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = upload.single("file");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

function uploadFromBuffer(req) {
  return new Promise(async (resolve, reject) => {
    const stream = await cloudinary.uploader.upload_stream(
      {
        folder: "transcriptions",
        resource_type: "video",
        upload_preset: process.env.CLOUDINARY_PRESET,
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
}

export default async function handler(req, res) {
  try {
    await runMiddleware(req, res, uploadMiddleware);

    const result = await uploadFromBuffer(req);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
