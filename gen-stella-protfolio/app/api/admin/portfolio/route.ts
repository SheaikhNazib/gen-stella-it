import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { portfolioProjectSchema } from "@/lib/validations/admin";
import * as z from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const projects = await db.portfolioProject.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
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
    const body = portfolioProjectSchema.parse(json);

    const project = await db.portfolioProject.create({
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description,
        shortDescription: body.shortDescription,
        image: body.image,
        category: body.category,
        technologies: body.technologies,
        link: body.link,
        caseStudy: body.caseStudy,
        results: body.results,
        clientName: body.clientName,
        testimonialQuote: body.testimonialQuote,
        date: body.date,
        featured: body.featured,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id, ...data } = await req.json();
    const body = portfolioProjectSchema.parse(data);

    const project = await db.portfolioProject.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description,
        shortDescription: body.shortDescription,
        image: body.image,
        category: body.category,
        technologies: body.technologies,
        link: body.link,
        caseStudy: body.caseStudy,
        results: body.results,
        clientName: body.clientName,
        testimonialQuote: body.testimonialQuote,
        date: body.date,
        featured: body.featured,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }
    return new NextResponse("Internal Error", { status: 500 });
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
      return new NextResponse("Project ID is required", { status: 400 });
    }

    await db.portfolioProject.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
