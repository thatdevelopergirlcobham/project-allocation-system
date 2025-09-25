import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Student from '../../../../models/Student';
import Project from '../../../../models/Project';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const student = await Student.findById(params.id);

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Manually populate assigned project
    const assignedProject = (student as any).assignedProject ? 
      await Project.findById((student as any).assignedProject) : null;

    const populatedStudent = {
      ...student,
      assignedProject
    };

    return NextResponse.json(populatedStudent);
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student' },
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
    const { name, matricNumber, email, department, preference } = body;

    const updatedStudent = await Student.findByIdAndUpdate(
      params.id,
      { name, matricNumber, email, department, preference }
    );

    if (!updatedStudent) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Manually populate assigned project
    const assignedProject = (updatedStudent as any).assignedProject ? 
      await Project.findById((updatedStudent as any).assignedProject) : null;

    const populatedStudent = {
      ...updatedStudent,
      assignedProject
    };

    return NextResponse.json(populatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { error: 'Failed to update student' },
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

    const deletedStudent = await Student.findByIdAndDelete(params.id);

    if (!deletedStudent) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}
