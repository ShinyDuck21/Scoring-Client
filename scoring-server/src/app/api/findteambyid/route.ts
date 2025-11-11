import { NextResponse, NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export async function POST(request: NextRequest) {
    const scorePath = join(process.cwd(), "data", "scoreboard.json")
    const currentScoreBoardFile = readFileSync(scorePath, 'utf8');
    let currentScoreBoardData = JSON.parse(currentScoreBoardFile);
    const id = await request.json()

    const teamExists = currentScoreBoardData.teams.some(
        ( t: Team ) => t.id === id.id
    );

    if (!teamExists) {
        return Response.json({"status": 404, "message": "Team not Found"})
    }

    const results = currentScoreBoardData.teams.filter(
        ( t: Team ) => t.id === id.id
    )

    return NextResponse.json(results[0]);
}