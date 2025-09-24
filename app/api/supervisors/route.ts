import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Supervisor from '../../../models/Supervisor';

export async function GET() {
  try {
    await dbConnect();

    const supervisors = await Supervisor.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json(supervisors);
  } catch (error) {
    console.error('Error fetching supervisors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch supervisors' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, department, specialization } = body;

    if (!name || !email || !department || !specialization) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supervisor = new Supervisor({
      name,
      email,
      department,
      specialization,
      projectsCount: 0
    });

    const savedSupervisor = await supervisor.save();

    return NextResponse.json(savedSupervisor, { status: 201 });
  } catch (error) {
    console.error('Error creating supervisor:', error);
    return NextResponse.json(
      { error: 'Failed to create supervisor' },
      { status: 500 }
    );
  }
}
