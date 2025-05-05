// src/routes/uploadRoutes.ts
import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controller/upload.controller.js";

const router = Router();
// memoryStorage: локал диск руу хадгалахгүй
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload – image, video, pdf бүгдийг дэмжинэ
router.post("/upload", upload.single("file"), uploadFile);

export default router;
