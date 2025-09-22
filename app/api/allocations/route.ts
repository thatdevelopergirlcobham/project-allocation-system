import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Allocation from '../../../models/Allocation';

export async function GET() {
  try {
    await dbConnect();

    const allocations = await Allocation.find({})
      .populate('studentId')
      .populate('projectId')
      .populate('supervisorId')
      .sort({ createdAt: -1 });

    return NextResponse.json(allocations);
  } catch (error) {
    console.error('Error fetching allocations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch allocations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { studentId, projectId, supervisorId } = body;

    if (!studentId || !projectId || !supervisorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newAllocation = await Allocation.create({
      studentId,
      projectId,
      supervisorId
    });

    return NextResponse.json(newAllocation, { status: 201 });
  } catch (error) {
    console.error('Error creating allocation:', error);
    return NextResponse.json(
      { error: 'Failed to create allocation' },
      { status: 500 }
    );
  }
}
