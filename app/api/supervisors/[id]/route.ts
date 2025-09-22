import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Supervisor from '../../../models/Supervisor';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const supervisor = await Supervisor.findById(params.id);

    if (!supervisor) {
      return NextResponse.json(
        { error: 'Supervisor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(supervisor);
  } catch (error) {
    console.error('Error fetching supervisor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch supervisor' },
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
    const { name, email, department, specialization } = body;

    const updatedSupervisor = await Supervisor.findByIdAndUpdate(
      params.id,
      {
        name,
        email,
        department,
        specialization
      },
      { new: true }
    );

    if (!updatedSupervisor) {
      return NextResponse.json(
        { error: 'Supervisor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSupervisor);
  } catch (error) {
    console.error('Error updating supervisor:', error);
    return NextResponse.json(
      { error: 'Failed to update supervisor' },
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

    const deletedSupervisor = await Supervisor.findByIdAndDelete(params.id);

    if (!deletedSupervisor) {
      return NextResponse.json(
        { error: 'Supervisor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Supervisor deleted successfully' });
  } catch (error) {
    console.error('Error deleting supervisor:', error);
    return NextResponse.json(
      { error: 'Failed to delete supervisor' },
      { status: 500 }
    );
  }
}
