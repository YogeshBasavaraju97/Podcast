
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { userAuth } from '@/middleware/Auth';


export async function GET() {
  await dbConnect();

  try {
    const user = await userAuth();
    return NextResponse.json({
      user: {
        _id: user._id,
        UserName: user.UserName,
        emailId: user.emailId,
      }
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function PUT(request) {
  await dbConnect();

  try {
    const user = await userAuth();
    const data = await request.json();

    const updatedUser = await User.findByIdAndUpdate(user._id, data, {
      new: true,
      runValidators: true,
    }).select('-password');

    return NextResponse.json({
      message: 'Profile updated',
      user: {
        _id: updatedUser._id,
        UserName: updatedUser.UserName,
        emailId: updatedUser.emailId,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
