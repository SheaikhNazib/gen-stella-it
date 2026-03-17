import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { blogPostSchema } from "@/lib/validations/admin";
import * as z from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const posts = await db.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
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
    const body = blogPostSchema.parse(json);

    const post = await db.blogPost.create({
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description,
        date: body.date,
        author: body.author,
        tags: body.tags,
        category: body.category,
        featuredImage: body.featuredImage,
        keywords: body.keywords,
        readingTime: body.readingTime,
        content: body.content,
        published: body.published,
      },
    });

    return NextResponse.json(post);
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

    const json = await req.json();
    const { id, ...data } = json;
    
    if (!id) {
      return new NextResponse("ID is required", { status: 400 });
    }

    const body = blogPostSchema.parse(data);

    const post = await db.blogPost.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description,
        date: body.date,
        author: body.author,
        tags: body.tags,
        category: body.category,
        featuredImage: body.featuredImage,
        keywords: body.keywords,
        readingTime: body.readingTime,
        content: body.content,
        published: body.published,
      },
    });

    return NextResponse.json(post);
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
      return new NextResponse("ID is required", { status: 400 });
    }

    await db.blogPost.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
