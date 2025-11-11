import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({message: "Welcome to My API. If you see this you're propably not where your supposed to be"});
}
