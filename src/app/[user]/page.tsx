'use client';
import { UserCard } from '@/components/user-card';
import * as React from 'react';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';

export interface IUserDetailProps {
  params: { user: string };
}

export default function UserDetail({ params }: IUserDetailProps) {
  const userId = params.user;

  const [user, setUser] = useState<User | null>(null);
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);

  React.useEffect(() => {
    fetch(`/api/user/?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setFollowers(data.followers);
        setFollowing(data.following);
      });
  }, [userId]);

  if (!user || !followers || !following) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="w-10 h-10 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  m-10">
      <Card className="min-w-[250px] text-center">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Followers: {followers.length}</p>
          <p>Following: {following.length}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold text-center mt-10">Follower</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
        {followers.map((follower) => (
          <UserCard
            key={follower.id}
            user={{
              id: follower.id,
              email: follower.email,
              followers: follower.followers,
              following: follower.following,
              name: follower.name,
            }}
          />
        ))}
      </section>

      <h2 className="text-2xl font-bold text-center mt-10">Following</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
        {following.map((follower) => (
          <UserCard
            key={follower.id}
            user={{
              id: follower.id,
              email: follower.email,
              followers: follower.followers,
              following: follower.following,
              name: follower.name,
            }}
          />
        ))}
      </section>
    </div>
  );
}
