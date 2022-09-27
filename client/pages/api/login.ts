import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const resp = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await resp.json();
  if (data.ok) {
    res.setHeader('Set-Cookie', cookie.serialize('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
      path: '/',
    }));
  }
  res.status(200).json({ message: 'success' });
}
