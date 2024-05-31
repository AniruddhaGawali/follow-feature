import prisma from '@/prismaClient';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const userId = new URL(req.url).searchParams.get('userId');

    if (userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          followers: true,
          following: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      const followers = await prisma.user.findMany({
        where: {
          id: {
            in: user.followers,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          followers: true,
          following: true,
        },
      });

      const following = await prisma.user.findMany({
        where: {
          id: {
            in: user.following,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          followers: true,
          following: true,
        },
      });

      return NextResponse.json({
        user,
        followers,
        following,
      });
    } else {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          followers: true,
          following: true,
        },
      });

      return NextResponse.json(users);
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Something went wrong' });
  }
}

export async function POST(req: Request) {
  const { name, email } = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    if (user) {
      return NextResponse.json({ message: 'User created!' }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: 'Failed to create user' },
        { status: 400 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Something went wrong' });
  }
}
