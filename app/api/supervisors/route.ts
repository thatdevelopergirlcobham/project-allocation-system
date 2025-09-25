import { NextRequest, NextResponse } from 'next/server';
import { find, create } from '../../../lib/dummyData';

export async function GET() {
  try {
    const supervisors = await find('supervisors', {});

    // Sort by creation date
    supervisors.sort((a: any, b: any) => {
      return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    });

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
    const body = await request.json();
    const { name, email, department, specialization } = body;
    if (!name || !email || !department || !specialization) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supervisor = await create('supervisors', {
      name,
      email,
      department,
      specialization,
      projectsCount: 0,
      isActive: true
    } as any);

    return NextResponse.json(supervisor, { status: 201 });
  } catch (error) {
    console.error('Error creating supervisor:', error);
    return NextResponse.json(
      { error: 'Failed to create supervisor' },
      { status: 500 }
    );
  }
}
