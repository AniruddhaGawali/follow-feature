import Link from 'next/link';
import * as React from 'react';

export interface IUserCardProps {
  user: User;
}

export function UserCard(props: IUserCardProps) {
  return (
    <Link href={`/${props.user.id}`}>
      <div className="flex flex-col items-center justify-center border-2 border-black p-8 rounded-lg hover:shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{props.user.name}</h1>

        <h2 className="text-lg font-semibold text-gray mb-4">
          {props.user.email}
        </h2>

        <p
          className={`${
            props.user.followers.length > 0 ? 'text-green-500' : 'text-red-500'
          } text-base`}
        >
          Followers: {props.user.followers.length}
        </p>

        <p
          className={`${
            props.user.following.length > 0 ? 'text-green-500' : 'text-red-500'
          } text-base`}
        >
          Following: {props.user.following.length}
        </p>
      </div>
    </Link>
  );
}
