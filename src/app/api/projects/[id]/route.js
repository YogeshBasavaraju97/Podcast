import { NextResponse } from 'next/server';
import Transcript from '@/models/Transcript';
import dbConnect from '@/lib/mongodb';
import { userAuth } from '@/middleware/Auth';

export async function POST(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const { id } = await params;
  await userAuth(req);

  try {
    const transcript = await Transcript.create({
      projectId: id,
      title: body.title,
      content: body.content,
    });

    return NextResponse.json({ message: 'Transcript created' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = await params;
  await userAuth(req);

  try {
    const transcripts = await Transcript.find({ projectId: id });
    return NextResponse.json({ transcripts });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

