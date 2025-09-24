import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/Project';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const supervisorId = searchParams.get('supervisorId');
    const department = searchParams.get('department');
    const status = searchParams.get('status');
    
    // Build query object
    const query: Record<string, string> = {};
    if (supervisorId) query.supervisorId = supervisorId;
    if (department) query.department = department;
    if (status) query.status = status;

    const projects = await Project.find(query)
      .populate('supervisorId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { title, description, department, maxStudents, requirements, supervisorId } = body;

    if (!title || !description || !department || !maxStudents || !supervisorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const project = new Project({
      title,
      description,
      department,
      maxStudents,
      requirements,
      supervisorId,
      status: 'available',
      currentStudents: 0
    });

    const savedProject = await project.save();

    return NextResponse.json(savedProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
