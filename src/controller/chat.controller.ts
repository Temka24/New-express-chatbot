import { Request, Response, NextFunction } from "express";
import { sendToDeepseek } from "../service/openai.service.js";

export const handleChat = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;

    if (!message) {
        res.json({ msg: "body is empty", status: false });
        return;
    }

    try {
        const reply = await sendToDeepseek(message);
        res.json({ reply, status: true });
    } catch (err) {
        next(err);
    }
};
