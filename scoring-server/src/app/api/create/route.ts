import { NextResponse, NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

let counter = 1

export async function PUT(request: NextRequest) {
    var body = await request.json()
    body.id = counter;

    const scorePath = join(process.cwd(), "data", "scoreboard.json")
    const currentScoreBoardFile = readFileSync(scorePath, 'utf8');
    let currentScoreBoardData = JSON.parse(currentScoreBoardFile);

    const teamExists = currentScoreBoardData.teams.some(
        ( t: Team ) => t.teamname.toLowerCase() === body.teamname.toLowerCase()
    );

    if (teamExists) {
        return Response.json({"status": 404})
    }

    currentScoreBoardData.teams.push(body)
    let newScoreData = JSON.stringify(currentScoreBoardData)

    writeFileSync(scorePath, newScoreData, 'utf8')
    
    counter++
    return NextResponse.json({"status": 200, "id": body.id});
}