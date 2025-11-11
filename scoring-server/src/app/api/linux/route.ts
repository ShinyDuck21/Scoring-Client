import { readFileSync } from "fs";
import { NextResponse, NextRequest } from "next/server";
import { join } from "path";

export async function GET() {
    const answerKeyPath = join(process.cwd(), "data", "linuxAnswerKey.json");
    const answerKey = readFileSync(answerKeyPath, 'utf-8');

    // Encode in Base 64 the answer key
    const encodedAnswerKey = btoa(answerKey)

    return new Response(encodedAnswerKey, {
        headers: {
            'Content-Type': 'text/plain',
        }
    });
}