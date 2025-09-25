import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Allocation from '../../../models/Allocation';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const projectId = searchParams.get('projectId');
    const supervisorId = searchParams.get('supervisorId');
    
    // Build query object
    const query: Record<string, string> = {};
    if (studentId) query.studentId = studentId;
    if (projectId) query.projectId = projectId;
    if (supervisorId) query.supervisorId = supervisorId;
    
    const allocations = await Allocation.find(query)
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
    const { studentId, projectId } = body;

    if (!studentId || !projectId) {
      return NextResponse.json(
        { error: 'Missing required fields: studentId and projectId' },
        { status: 400 }
      );
    }

    // Get the project to find the supervisor
    const Project = (await import('../../../models/Project')).default;
    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const newAllocation = await Allocation.create({
      studentId,
      projectId,
      supervisorId: project.supervisorId
    });

    // Update project status to assigned
    await Project.findByIdAndUpdate(projectId, { status: 'assigned' });

    // Update student's assigned project
    const Student = (await import('../../../models/Student')).default;
    await Student.findByIdAndUpdate(studentId, { assignedProject: projectId });

    return NextResponse.json(newAllocation, { status: 201 });
  } catch (error) {
    console.error('Error creating allocation:', error);
    return NextResponse.json(
      { error: 'Failed to create allocation' },
      { status: 500 }
    );
  }
}
