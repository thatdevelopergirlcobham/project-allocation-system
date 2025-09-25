import { NextRequest, NextResponse } from 'next/server';
import { find, create, findOne } from '../../../lib/dummyData';

export async function GET() {
  try {
    const students = await find('students', {});

    // Manually populate assigned project data for each student
    const populatedStudents = await Promise.all(students.map(async (student: any) => {
      if (student.assignedProject) {
        const { getById } = await import('../../../lib/dummyData');
        const project = await getById('projects', student.assignedProject) as any;
        if (project) {
          return {
            ...student,
            assignedProject: {
              _id: project._id,
              title: project.title,
              description: project.description,
              status: project.status
            }
          };
        }
      }
      return student;
    }));

    // Sort by creation date
    populatedStudents.sort((a: any, b: any) => {
      return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
    });

    return NextResponse.json(populatedStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, matricNumber, email, department, preference, password } = body;

    if (!name || !matricNumber || !email || !department || !preference || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if student already exists
    const existingStudent = await findOne('students', { $or: [{ matricNumber }, { email }] });
    if (existingStudent) {
      return NextResponse.json(
        { error: 'Student with this matriculation number or email already exists' },
        { status: 409 }
      );
    }

    // Check if user already exists
    const existingUser = await findOne('users', { email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create user account first
    const userData = {
      name,
      email,
      password: `hashed:${password}`,
      role: 'student',
      department,
      matricNumber,
      isActive: true
    };

    const { create: createUser } = await import('../../../lib/dummyData');
    const savedUser: any = await createUser('users', userData as any);

    // Create student record
    const newStudent = await create('students', {
      name,
      matricNumber,
      email,
      department,
      preference,
      role: 'student',
      isActive: true
    } as any);

    return NextResponse.json({
      student: newStudent,
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
}
