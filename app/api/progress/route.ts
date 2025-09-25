import { NextRequest, NextResponse } from 'next/server';
import { find, create, getById } from '../../../lib/dummyData';

export async function GET() {
  try {
    const progressReports = await find('progress');

    // Manually populate related data for each progress report
    const populatedProgress = await Promise.all(progressReports.map(async (progress: any) => {
      const [student, project] = await Promise.all([
        getById('students', progress.studentId),
        getById('projects', progress.projectId)
      ]);

      return {
        ...progress,
        studentId: student ? {
          _id: student._id,
          name: (student as any).name,
          email: (student as any).email
        } : null,
        projectId: project ? {
          _id: project._id,
          title: (project as any).title,
          description: (project as any).description
        } : null
      };
    }));

    // Sort by creation date
    populatedProgress.sort((a: any, b: any) => {
      return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    });

    return NextResponse.json(populatedProgress);
  } catch (error) {
    console.error('Error fetching progress reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, projectId, report } = body;

    if (!studentId || !projectId || !report) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProgress = await create('progress', {
      studentId,
      projectId,
      report
    } as any);

    return NextResponse.json(newProgress, { status: 201 });
  } catch (error) {
    console.error('Error creating progress report:', error);
    return NextResponse.json(
      { error: 'Failed to create progress report' },
      { status: 500 }
    );
  }
}
