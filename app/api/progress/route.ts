import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Progress from '../../../models/Progress';

export async function GET() {
  try {
    await dbConnect();

    const progressReports = await Progress.find({})
      .populate('studentId')
      .populate('projectId')
      .sort({ createdAt: -1 });

    return NextResponse.json(progressReports);
  } catch (error) {
    console.error('Error fetching progress reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { studentId, projectId, report } = body;

    if (!studentId || !projectId || !report) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProgress = await Progress.create({
      studentId,
      projectId,
      report
    });

    return NextResponse.json(newProgress, { status: 201 });
  } catch (error) {
    console.error('Error creating progress report:', error);
    return NextResponse.json(
      { error: 'Failed to create progress report' },
      { status: 500 }
    );
  }
}
