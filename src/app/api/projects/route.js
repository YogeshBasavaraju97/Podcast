import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { userAuth } from "@/middleware/Auth";

export async function POST(req) {
  await dbConnect();

  try {
    const user = await userAuth(req);
    const body = await req.json();
    console.log(body.name);

    const project = await Project.create({
      name: body.name,
      owner: user._id, // Link project to user
    });

    return NextResponse.json({ message: 'Project created', project }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}



export async function GET() {
  try {
    await dbConnect();
    const user = await userAuth(req);

    const projectsWithStats = await Project.aggregate([
      {
        $lookup: {
          from: 'transcripts', // collection name in MongoDB (lowercase plural)
          localField: '_id',
          foreignField: 'projectId',
          as: 'transcripts'
        }
      },
      {
        $addFields: {
          transcriptCount: { $size: '$transcripts' },
          lastUpdatedTranscript: {
            $max: '$transcripts.updatedAt'
          }
        }
      },
      {
        $project: {
          name: 1,
          owner: 1,
          transcriptCount: 1,
          lastUpdatedTranscript: 1
        }
      }
    ]);

    return NextResponse.json({ projects: projectsWithStats });
  } catch (error) {
    console.error('Error fetching project stats:', error);
    return NextResponse.json({ error: 'Failed to fetch project stats' }, { status: 500 });
  }
}
