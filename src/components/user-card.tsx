import Link from 'next/link';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';

export interface IUserCardProps {
  user: User;
}

export function UserCard(props: IUserCardProps) {
  return (
    <Link href={`/${props.user.id}`}>
      <Card className='min-w-[250px] text-center'>
        <CardHeader>
          <CardTitle>{props.user.name}</CardTitle>
          <CardDescription>{props.user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Followers: {props.user.followers.length}</p>
          <p>Following: {props.user.following.length}</p>
        </CardContent>
        <CardFooter className='items-center'>
          <Button className='m-auto'>View Profile</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
