import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { teamMemberSchema } from "@/lib/validations/admin";
import * as z from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const members = await db.teamMember.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(members);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = teamMemberSchema.parse(json);

    const member = await db.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        expertise: body.expertise,
        bio: body.bio,
        image: body.image,
        imagePositionX: Number.isFinite(body.imagePositionX) ? Math.round(body.imagePositionX) : 50,
        imagePositionY: Number.isFinite(body.imagePositionY) ? Math.round(body.imagePositionY) : 50,
        imageScale: Number.isFinite(body.imageScale) ? body.imageScale : 1,
        email: body.email,
        twitter: body.twitter,
        linkedin: body.linkedin,
        github: body.github,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[TEAM_POST_ZOD]", error.issues);
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("[TEAM_POST]", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal Error",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    console.log("[TEAM_PUT_RAW_DATA]", json);
    const { id, ...data } = json;
    
    if (!id) {
      return new NextResponse("Missing ID", { status: 400 });
    }

    const body = teamMemberSchema.parse(data);

    const member = await db.teamMember.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        expertise: body.expertise,
        bio: body.bio,
        image: body.image,
        imagePositionX: Number.isFinite(body.imagePositionX) ? Math.round(body.imagePositionX) : 50,
        imagePositionY: Number.isFinite(body.imagePositionY) ? Math.round(body.imagePositionY) : 50,
        imageScale: Number.isFinite(body.imageScale) ? body.imageScale : 1,
        email: body.email,
        twitter: body.twitter,
        linkedin: body.linkedin,
        github: body.github,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[TEAM_PUT_ZOD]", error.issues);
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }
    console.error("[TEAM_PUT]", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal Error",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Member ID is required", { status: 400 });
    }

    await db.teamMember.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
