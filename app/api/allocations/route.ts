import { NextRequest, NextResponse } from 'next/server';
import { find, create, getById } from '../../../lib/dummyData';

export async function GET(request: NextRequest) {
  try {
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

    const allocations = await find('allocations', query);

    // Manually populate related data for each allocation
    const populatedAllocations = await Promise.all(allocations.map(async (allocation: any) => {
      const [student, project, supervisor] = await Promise.all([
        getById('students', allocation.studentId),
        getById('projects', allocation.projectId),
        getById('supervisors', allocation.supervisorId)
      ]);

      return {
        ...allocation,
        studentId: student ? {
          _id: student._id,
          name: (student as any).name,
          email: (student as any).email
        } : null,
        projectId: project ? {
          _id: project._id,
          title: (project as any).title,
          description: (project as any).description
        } : null,
        supervisorId: supervisor ? {
          _id: supervisor._id,
          name: (supervisor as any).name,
          email: (supervisor as any).email
        } : null
      };
    }));

    // Sort by creation date
    populatedAllocations.sort((a: any, b: any) => {
      return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    });

    return NextResponse.json(populatedAllocations);
  } catch (error) {
    console.error('Error fetching allocations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch allocations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, projectId } = body;

    if (!studentId || !projectId) {
      return NextResponse.json(
        { error: 'Missing required fields: studentId and projectId' },
        { status: 400 }
      );
    }

<<<<<<< HEAD
    const newAllocation = await create('allocations', {
      studentId,
      projectId,
      supervisorId
    } as any);
=======
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
>>>>>>> 31c655f9067ff79ce2395470b38dba5f921a4c08

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
