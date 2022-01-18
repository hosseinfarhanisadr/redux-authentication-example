import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = { email: string; name: string } | { message: string };

export const users = [
  {
    email: 'hossein@example.com',
    name: 'Hossein',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Supported method: GET.' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  const token = authHeader?.split(' ')?.[1];

  try {
    const decoded = jwt.verify(token, 'ACCESS_TOKEN_SECRET');
    return res.status(200).json({ email: decoded.email, name: decoded.name });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }
}
