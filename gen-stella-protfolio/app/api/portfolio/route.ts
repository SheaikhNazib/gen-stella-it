import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await db.portfolioProject.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("[PORTFOLIO_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
