
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import User from '@/models/User';

export async function userAuth() {
  const token = (await cookies()).get('authToken')?.value;

  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("invalid User");
    }
    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
