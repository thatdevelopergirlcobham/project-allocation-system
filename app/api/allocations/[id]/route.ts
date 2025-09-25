import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Allocation from '../../../../models/Allocation';
import Project from '../../../../models/Project';
import Student from '../../../../models/Student';
import Supervisor from '../../../../models/Supervisor';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const allocation = await Allocation.findById(params.id);

    if (!allocation) {
      return NextResponse.json(
        { error: 'Allocation not found' },
        { status: 404 }
      );
    }

    // Manually populate related data
    const student = await Student.findById((allocation as any).studentId);
    const project = await Project.findById((allocation as any).projectId);
    const supervisor = await Supervisor.findById((allocation as any).supervisorId);

    const populatedAllocation = {
      ...allocation,
      studentId: student,
      projectId: project,
      supervisorId: supervisor
    };

    return NextResponse.json(populatedAllocation);
  } catch (error) {
    console.error('Error fetching allocation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch allocation' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();
    const { studentId, projectId, supervisorId } = body;

    const updatedAllocation = await Allocation.findByIdAndUpdate(
      params.id,
      { studentId, projectId, supervisorId }
    );

    if (!updatedAllocation) {
      return NextResponse.json(
        { error: 'Allocation not found' },
        { status: 404 }
      );
    }

    // Manually populate related data
    const student = await Student.findById((updatedAllocation as any).studentId);
    const project = await Project.findById((updatedAllocation as any).projectId);
    const supervisor = await Supervisor.findById((updatedAllocation as any).supervisorId);

    const populatedAllocation = {
      ...updatedAllocation,
      studentId: student,
      projectId: project,
      supervisorId: supervisor
    };

    return NextResponse.json(populatedAllocation);
  } catch (error) {
    console.error('Error updating allocation:', error);
    return NextResponse.json(
      { error: 'Failed to update allocation' },
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

    // Get the allocation first to update related records
    const allocation = await Allocation.findById(params.id);
    
    if (!allocation) {
      return NextResponse.json(
        { error: 'Allocation not found' },
        { status: 404 }
      );
    }

    // Update the project's currentStudents count
    if ((allocation as any).projectId) {
      await Project.findByIdAndUpdate(
        (allocation as any).projectId,
        { $inc: { currentStudents: -1 } }
      );
    }

    // Update the student's assignedProject
    if ((allocation as any).studentId) {
      await Student.findByIdAndUpdate(
        (allocation as any).studentId,
        { $unset: { assignedProject: "" } }
      );
    }

    // Delete the allocation
    await Allocation.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Allocation deleted successfully' });
  } catch (error) {
    console.error('Error deleting allocation:', error);
    return NextResponse.json(
      { error: 'Failed to delete allocation' },
      { status: 500 }
    );
  }
}
