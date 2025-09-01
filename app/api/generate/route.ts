import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(req: Request){
    const { code, db, framework } = await req.json();

    const prompt = `
        You are a backend generator.

        Frontend code:
        ${code}

        Database: ${db}
        Framework: ${framework}

        Generate backend models and CRUD routes matching the frontend.

        ⚠️ IMPORTANT:
        Always format the response in this Markdown structure:

        ### Explanation
        A short explanation (2–3 sentences) about the backend design.

        ### Code
        \`\`\`${framework === "fastapi" ? "python" : framework === "go" ? "go" : "typescript"}
        <backend code here>
        \`\`\`
    `;


    const stream = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile", //model for code
        messages: [{ role: "user", content: prompt }],
        stream: true,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
        async start(controller) {
        for await (const chunk of stream){
            const content = chunk.choices[0]?.delta?.content;
            if(content){
            controller.enqueue(encoder.encode(content));
            }
        }
        controller.close();
        },
    });

    return new Response(readableStream, {
        headers: { "Content-Type": "text/plain"},
    });
}
