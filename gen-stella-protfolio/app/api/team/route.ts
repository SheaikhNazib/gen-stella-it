import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const members = await db.teamMember.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error("[TEAM_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
