## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## APIs
1. Create User 
    - `/api/user` POST Request 

2. Follow User
    - `/api/follow` POST Request

3. Unfollow User
    - `/api/follow` DELETE Request

4. Get Followes
    - `/api/follow?user=id` GET Request

5. Get Following
    - `/api/following?user=id` GET Request

6. Get All User Data
    - `/api/user` GET Request

7. Get User Data
    - `/api/user?userId=id` GET Request


## Schema 
Here is the schema for the `User` table in table form:

### User Table

| Field      | Type     | Attributes                                |
|------------|----------|-------------------------------------------|
| id         | String   | @id @default(auto()) @map("_id") @db.ObjectId |
| name       | String   |                                           |
| email      | String   | @unique                                   |
| createdAt  | DateTime | @default(now())                           |
| updatedAt  | DateTime | @updatedAt                                |
| followers  | String[] | @db.ObjectId                              |
| following  | String[] | @db.ObjectId                              |