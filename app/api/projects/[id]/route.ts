import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Project from '../../../../models/Project';
import Supervisor from '../../../../models/Supervisor';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const project = await Project.findById(params.id);

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Manually populate supervisor data
    const supervisor = await Supervisor.findById((project as any).supervisorId);

    const populatedProject = {
      ...project,
      supervisorId: supervisor
    };

    return NextResponse.json(populatedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
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
    const { title, description, department, maxStudents, requirements } = body;

    const updatedProject = await Project.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        department,
        maxStudents,
        requirements
      }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Manually populate supervisor data
    const supervisor = await Supervisor.findById((updatedProject as any).supervisorId);

    const populatedProject = {
      ...updatedProject,
      supervisorId: supervisor
    };

    return NextResponse.json(populatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
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

    const deletedProject = await Project.findByIdAndDelete(params.id);

    if (!deletedProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
