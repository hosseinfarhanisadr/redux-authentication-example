import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

const users = [
  {
    email: 'hossein@example.com',
    name: 'Hossein',
    password: bcrypt.hashSync('123456', 10),
  },
];

type ResponseData =
  | { accessToken: string; user: { email: string; name: string } }
  | { message: string };

function generateAccessToken(user) {
  return jwt.sign(user, 'ACCESS_TOKEN_SECRET', { expiresIn: '24h' });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Supported method: POST.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ message: 'The email and password field is required.' });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res
      .status(401)
      .json({ message: 'username or password is incorrect!' });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (isPasswordMatched) {
    const accessToken = generateAccessToken({
      email: user.email,
      name: user.name,
    });

    return res
      .status(200)
      .json({ accessToken, user: { email: user.email, name: user.name } });
  }

  return res
    .status(401)
    .json({ message: 'username or password is incorrect!' });
}
