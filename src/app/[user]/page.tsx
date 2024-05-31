'use client';
import { UserCard } from '@/components/user-card';
import * as React from 'react';
import { useState } from 'react';

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

  return (
    <div className="min-h-screen  m-10">
      <div className="flex flex-col items-center justify-center border-2 border-black p-8 rounded-lg hover:shadow-lg cursor-pointer">
        <h1 className="text-3xl font-bold mb-4">{user?.name}</h1>

        <h2 className="text-lg font-semibold text-gray mb-4">{user?.email}</h2>

        <p
          className={`${
            followers.length > 0 ? 'text-green-500' : 'text-red-500'
          } text-base`}
        >
          Followers: {followers.length}
        </p>

        <p
          className={`${
            following.length > 0 ? 'text-green-500' : 'text-red-500'
          } text-base`}
        >
          Following: {following.length}
        </p>
      </div>
      ¸
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
    </div>
  );
}
