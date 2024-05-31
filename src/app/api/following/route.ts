import prisma from '@/prismaClient';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('user');
  if (!id)
    return NextResponse.json({ message: 'User not found' }, { status: 404 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        following: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const following = await prisma.user.findMany({
      where: {
        id: {
          in: user.following,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (following) {
      return NextResponse.json( following );
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}