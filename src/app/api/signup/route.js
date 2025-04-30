
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    const body = await req.json();
    const { UserName, emailId, password } = body;



    if (!UserName || !emailId || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    console.log(UserName, emailId, password);
    await dbConnect();

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      UserName,
      emailId,
      password: hashPassword,
    });

    await user.save();

    return NextResponse.json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Signup error: ' + error.message }, { status: 400 });
  }
}
