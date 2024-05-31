'use client';
import { UserCard } from '@/components/user-card';
import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  console.log(users);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24x">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center m-10">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={{
              id: user.id,
              email: user.email,
              followers: user.followers,
              following: user.following,
              name: user.name,
            }}
          />
        ))}
      </section>
    </main>
  );
}
