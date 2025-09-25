import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Progress from '../../../../models/Progress';
import Student from '../../../../models/Student';
import Project from '../../../../models/Project';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const progress = await Progress.findById(params.id);

    if (!progress) {
      return NextResponse.json(
        { error: 'Progress report not found' },
        { status: 404 }
      );
    }

    // Manually populate related data
    const student = await Student.findById((progress as any).studentId);
    const project = await Project.findById((progress as any).projectId);

    const populatedProgress = {
      ...progress,
      studentId: student,
      projectId: project
    };

    return NextResponse.json(populatedProgress);
  } catch (error) {
    console.error('Error fetching progress report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress report' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();
    const { feedback } = body;

    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback is required' },
        { status: 400 }
      );
    }

    const updatedProgress = await Progress.findByIdAndUpdate(
      params.id,
      { feedback }
    );

    if (!updatedProgress) {
      return NextResponse.json(
        { error: 'Progress report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProgress);
  } catch (error) {
    console.error('Error updating progress report:', error);
    return NextResponse.json(
      { error: 'Failed to update progress report' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const deletedProgress = await Progress.findByIdAndDelete(params.id);

    if (!deletedProgress) {
      return NextResponse.json(
        { error: 'Progress report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Progress report deleted successfully' });
  } catch (error) {
    console.error('Error deleting progress report:', error);
    return NextResponse.json(
      { error: 'Failed to delete progress report' },
      { status: 500 }
    );
  }
}
