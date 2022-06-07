// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
};
type Data = {
  name: string;
  users?: User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = await axios.get(
    'https://629f6f51461f8173e4e98e11.mockapi.io/users'
  );
  res.status(200).json({ name: 'Jack', users: users.data });
}
