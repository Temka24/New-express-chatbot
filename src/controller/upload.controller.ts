// src/controllers/uploadController.ts
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.file;
        const name = req.body.name;

        if (!file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }

        // MIME төрлөөр resource_type тодорхойлно
        const mime = file.mimetype;
        let resourceType: "image" | "video" | "raw" = "raw";

        if (mime.startsWith("image/")) {
            resourceType = "image";
        } else if (mime.startsWith("video/")) {
            resourceType = "video";
        } else {
            resourceType = "raw"; // pdf, docx, xlsx гэх мэт
        }

        const public_id = String(Date.now());

        const stream = cloudinary.uploader.upload_stream(
            {
                folder:
                    resourceType === "image"
                        ? "test/my_images"
                        : resourceType === "video"
                          ? "test/my_videos"
                          : "test/my_documents",
                resource_type: resourceType,
                public_id: public_id,
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    res.status(500).json({ message: "Upload failed", error });
                    return;
                }

                return res.status(200).json({
                    message: "Upload successful",
                    type: resourceType,
                    url: result?.secure_url,
                    name,
                    public_id,
                });
            },
        );

        Readable.from(file.buffer).pipe(stream);
    } catch (error) {
        console.error("Upload controller error:", error);
        next(error);
    }
};
