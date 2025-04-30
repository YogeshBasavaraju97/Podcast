
import { NextResponse } from 'next/server';
import Transcript from '@/models/Transcript';
import dbConnect from '@/lib/mongodb';
import { userAuth } from '@/middleware/Auth';


export async function PUT(req, { params }) {
  await dbConnect();
  await userAuth(req);
  const { id } = await params;// transcript id
  const body = await req.json();


  try {
    const updatedTranscript = await Transcript.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTranscript) {
      return NextResponse.json({ error: 'Transcript not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transcript updated', transcript: updatedTranscript });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  await dbConnect();
  await userAuth(req);
  const { id } = await params;

  try {
    const deleted = await Transcript.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Transcript not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transcript deleted' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



export async function GET(req, { params }) {
  await dbConnect();
  await userAuth(req);

  const { id } = await params;

  try {
    const transcript = await Transcript.findById(id);

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript not found' }, { status: 404 });
    }

    return NextResponse.json({ transcript });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
