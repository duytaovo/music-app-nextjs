//@ts-nocheck
import getCurrentUser from "@/actions/getCurrentUser";
import getArrSinger from "@/helpers/getArrSinger";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  try {
    const type = response?.params?.type;
    const currentUser = await getCurrentUser();
    const array = currentUser[type];
    let typeQuery = type === "liked" ? "src" : "id";
    const songs = await prisma.song.findMany({
      where: {
        userId: currentUser?.id,
        [typeQuery]: { in: array },
      },
    });
    const data = songs.map((song) => ({
      ...song,
      singers: getArrSinger(song.singers),
    }));
    return NextResponse.json(data);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

