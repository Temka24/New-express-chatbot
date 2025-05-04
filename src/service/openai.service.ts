import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export const sendToDeepseek = async (message: string): Promise<string> => {
    const completion = await openai.chat.completions.create({
        model: "mistralai/mistral-7b-instruct",
        messages: [
            {
                role: "system",
                content: `You are a support assistant for a coffee shop.
                Here is our business info:
                - We are "Luna Coffee"
                - We open from 8am to 9pm, Mon to Sat
                - We deliver only within Ulaanbaatar city
                - Our main drinks: Americano 5000₮, Latte 6000₮
                Always answer based on this info.`,
            },
            { role: "user", content: message },
        ],
    });

    return completion.choices[0].message?.content || "No response.";
};
