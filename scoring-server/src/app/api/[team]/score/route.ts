import { NextResponse, NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ team: string }> }) {
    const scorePath = join(process.cwd(), "data", "scoreboard.json")
    const currentScoreBoardFile = readFileSync(scorePath, 'utf8');
    let currentScoreBoardData = JSON.parse(currentScoreBoardFile);
    const { team } = await params
    const body = await request.json()

    const teamExists = currentScoreBoardData.teams.some(
        ( t: Team ) => t.teamname.toLowerCase() === team.toLowerCase()
    );

    if (!teamExists) {
        return Response.json({"status": 404, "message": "Team not Found"})
    }

    const teamJson = currentScoreBoardData.teams.filter(
        ( t: Team ) => t.teamname.toLowerCase() === team.toLowerCase()
    )[0];

    if (body.gain === true){    
        teamJson.score += body.score
    } else {
        teamJson.score -= body.score
    }

    writeFileSync(scorePath, JSON.stringify(currentScoreBoardData), 'utf8')

    return NextResponse.json({"status": 200});
}