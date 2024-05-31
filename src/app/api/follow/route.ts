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
        followers: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
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
      },
    });

    if (followers) {
      return NextResponse.json( followers );
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

export async function POST(req: Request) {
  const { followerId, followingId } = await req.json();

  try {
    const follow = await prisma.user.update({
      where: { id: followerId },
      data: {
        following: {
          push: followingId,
        },
      },
    });

    const following = await prisma.user.update({
      where: { id: followingId },
      data: {
        followers: {
          push: followerId,
        },
      },
    });

    if (follow && following) {
      return NextResponse.json({ message: 'Followed!' }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: 'Failed to follow' },
        { status: 400 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Something went wrong' });
  }
}

export async function DELETE(req: Request) {
  const { followerId, followingId } = await req.json();

  try {
    const following = await prisma.user.findUnique({
      where: { id: followerId },
      select: { following: true },
    });

    const follow = await prisma.user.findUnique({
      where: { id: followingId },
      select: { followers: true },
    });

    if (following && follow) {
      const updatedFollowing = following.following.filter(
        (id) => id !== followingId
      );
      const updatedFollow = follow.followers.filter((id) => id !== followerId);

      const unfollow = await prisma.user.update({
        where: { id: followerId },
        data: {
          following: {
            set: updatedFollowing,
          },
        },
      });

      const unfollowing = await prisma.user.update({
        where: { id: followingId },
        data: {
          followers: {
            set: updatedFollow,
          },
        },
      });

      if (unfollow && unfollowing) {
        return NextResponse.json({ message: 'Unfollowed!' }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: 'Failed to unfollow' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { message: 'Failed to unfollow' },
        { status: 400 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
