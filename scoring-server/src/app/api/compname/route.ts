import { NextResponse, NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export async function PUT(request: NextRequest) {
    var body = await request.json()

    const scorePath = join(process.cwd(), "data", "scoreboard.json")
    const currentScoreBoardFile = readFileSync(scorePath, 'utf8');
    let currentScoreBoardData = JSON.parse(currentScoreBoardFile);

    currentScoreBoardData.name = body.name;
    let newScoreData = JSON.stringify(currentScoreBoardData);

    writeFileSync(scorePath, newScoreData, 'utf8')
    
    return NextResponse.json({"status": 200});
}

export async function GET(request: NextRequest) {
    const scorePath = join(process.cwd(), "data", "scoreboard.json")
    const currentScoreBoardFile = readFileSync(scorePath, 'utf8');
    let currentScoreBoardData = JSON.parse(currentScoreBoardFile);

    const results = {
        "name": currentScoreBoardData.name
    }

    return NextResponse.json(results);
}