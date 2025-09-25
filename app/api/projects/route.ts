import { NextRequest, NextResponse } from 'next/server';
import { find, create, getById, findOne } from '../../../lib/dummyData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const supervisorId = searchParams.get('supervisorId');
    const department = searchParams.get('department');
    const status = searchParams.get('status');

    // Build query object
    const query: Record<string, string> = {};
    if (supervisorId) query.supervisorId = supervisorId;
    if (department) query.department = department;
    if (status) query.status = status;

    // Get projects from dummy data
    const projects = await find('projects', query);

    // Manually populate supervisor data for each project
    const populatedProjects = await Promise.all(projects.map(async (project: any) => {
      if (typeof project.supervisorId === 'string') {
        const supervisor = await getById('supervisors', project.supervisorId);
        if (supervisor) {
          return {
            ...project,
            supervisorId: {
              _id: supervisor._id,
              name: supervisor.name,
              email: supervisor.email
            }
          };
        }
      }
      return project;
    }));

    // Sort by creation date
    populatedProjects.sort((a: any, b: any) => {
      return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    });

    return NextResponse.json(populatedProjects);
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
    const body = await request.json();
    const { title, description, department, maxStudents, requirements, supervisorId } = body;

    if (!title || !description || !department || !maxStudents || !supervisorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const project = await create('projects', {
      title,
      description,
      department,
      maxStudents,
      requirements,
      supervisorId,
      status: 'available',
      currentStudents: 0
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
