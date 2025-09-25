import { NextRequest, NextResponse } from 'next/server';
import { create, findOne } from '../../../../lib/dummyData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      role,
      department,
      matricNumber,
      specialization
    } = body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
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

    // Create user object based on role
    const userData: Record<string, unknown> = {
      name,
      email,
      password: `hashed:${password}`,
      role,
      isActive: true
    };

    // Add role-specific fields only if they exist and are not empty
    switch (role) {
      case 'admin':
        // Admins don't need department, matricNumber, or specialization
        // Only add them if they're provided (for flexibility)
        if (department && department.trim()) userData.department = department;
        if (specialization && specialization.trim()) userData.specialization = specialization;
        if (matricNumber && matricNumber.trim()) userData.matricNumber = matricNumber;
        break;

      case 'supervisor':
        if (!department || !specialization) {
          return NextResponse.json(
            { error: 'Department and specialization are required for supervisors' },
            { status: 400 }
          );
        }
        userData.department = department;
        userData.specialization = specialization;
        // matricNumber is not required for supervisors
        if (matricNumber && matricNumber.trim()) userData.matricNumber = matricNumber;
        break;

      case 'student':
        if (!department || !matricNumber) {
          return NextResponse.json(
            { error: 'Department and matriculation number are required for students' },
            { status: 400 }
          );
        }
        userData.department = department;
        userData.matricNumber = matricNumber;
        // specialization is not required for students
        if (specialization && specialization.trim()) userData.specialization = specialization;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid user role' },
          { status: 400 }
        );
    }

    // Create new user
    const savedUser = await create('users', userData) as any;

    // Return user data without password
    const userResponse = { ...savedUser };
    delete userResponse.password;

    return NextResponse.json({
      message: 'User created successfully',
      user: userResponse
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Registration error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: errorMessage,
        usingDummyDb: true
      },
      { status: 500 }
    );
  }
}
