import { NextResponse, NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export async function GET(request: NextRequest, { params }: { params: Promise<{ team: string }> }) {
    const scorePath = join(process.cwd(), "data", "scoreboard.json")
    const currentScoreBoardFile = readFileSync(scorePath, 'utf8');
    let currentScoreBoardData = JSON.parse(currentScoreBoardFile);
    const { team } = await params

    const teamExists = currentScoreBoardData.teams.some(
        ( t: Team ) => t.teamname.toLowerCase() === team.toLowerCase()
    );

    if (!teamExists) {
        return Response.json({"status": 404, "message": "Team not Found"})
    }

    const results = currentScoreBoardData.teams.filter(
        ( t: Team ) => t.teamname.toLowerCase() === team.toLowerCase()
    )

    return NextResponse.json(results);
}