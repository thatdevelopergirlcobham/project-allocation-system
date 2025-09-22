import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Progress from '../../../../models/Progress';

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
      { feedback },
      { new: true }
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
