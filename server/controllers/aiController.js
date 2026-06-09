import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from 'cloudinary'
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import Groq from "groq-sdk";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;

        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [{ role: "user", content: prompt }],
        });
        const content = completion.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

        res.json({
            success: true,
            message: "Article generated successfully",
            content,
        });

    } catch (error) {
        console.error("Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;

        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [{ role: "user", content: prompt }],
        });
        const content = completion.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

        res.json({
            success: true,
            message: "Blog generated successfully",
            content,
        });

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;

        const image = await hf.textToImage({
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            inputs: prompt,
        });

        const buffer = Buffer.from(await image.arrayBuffer());
        fs.writeFileSync("temp.png", buffer);

        const uploadResult = await cloudinary.uploader.upload("temp.png");
        fs.unlinkSync("temp.png");

        await sql`INSERT INTO creations (user_id, prompt, content, type, publish) 
                  VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image', ${publish ?? false})`;

        res.json({ success: true, content: uploadResult.secure_url });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image = req.file;

        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [{ effect: 'background_removal' }]
        })

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

        res.json({ success: true, content: secure_url, message: "Remove background successfully" });

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { object } = req.body;
        const image = req.file;

        const { public_id } = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation: [{ effect: `gen_remove:${object}` }],
            resource_type: 'image'
        })

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

        res.json({ success: true, content: imageUrl, message: "Remove object successfully" });

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();
        const resume = req.file;

        if (resume.size > 5 * 1024 * 1024) {
            return res.json({ success: false, message: "Resume file size exceeds allowed size (5MB)." })
        }

        const dataBuffer = fs.readFileSync(resume.path);
        const pdfData = await pdf(dataBuffer);

        const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`

        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [{ role: "user", content: prompt }],
        });
        const content = completion.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

        res.json({ success: true, content, message: "Review resume successfully" });

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const getPublishedCreations = async (req, res) => {
    try {
        const creations = await sql`
            SELECT c.*, COALESCE(
                json_agg(l.user_id) FILTER (WHERE l.user_id IS NOT NULL), '[]'
            ) as likes
            FROM creations c
            LEFT JOIN likes l ON c.id = l.creation_id
            WHERE c.publish = true AND c.type = 'image'
            GROUP BY c.id
            ORDER BY c.created_at DESC
        `;
        res.json({ success: true, creations });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const getUserCreations = async (req, res) => {
    try {
        const { userId } = req.auth();
        const creations = await sql`
            SELECT * FROM creations 
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;
        res.json({ success: true, creations });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const toggleLike = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { creationId } = req.body;

        const existing = await sql`
            SELECT * FROM likes WHERE user_id = ${userId} AND creation_id = ${creationId}
        `;

        if (existing.length > 0) {
            await sql`DELETE FROM likes WHERE user_id = ${userId} AND creation_id = ${creationId}`;
        } else {
            await sql`INSERT INTO likes (user_id, creation_id) VALUES (${userId}, ${creationId})`;
        }

        const likes = await sql`SELECT user_id FROM likes WHERE creation_id = ${creationId}`;

        res.json({ success: true, likes: likes.map(l => l.user_id) });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}