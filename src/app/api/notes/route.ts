import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";

// 创建笔记的 API
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("未登录", { status: 401 });
    }

    const { title, content } = await req.json();

    const note = await prisma.note.create({
      data: {
        title,
        content,
        author: {
          connect: {
            email: session.user.email!,
          },
        },
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("[NOTES]", error);
    return new NextResponse("服务器错误", { status: 500 });
  }
}

// 获取笔记列表的 API
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("未登录", { status: 401 });
    }

    const notes = await prisma.note.findMany({
      where: {
        author: {
          email: session.user.email!,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("[NOTES]", error);
    return new NextResponse("服务器错误", { status: 500 });
  }
}
