import { NextRequest, NextResponse } from 'next/server';
import { findOne, comparePassword } from '../../../../lib/dummyData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user by email and role
    const user = await findOne('users', { email, role }) as any;
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user data without password
    const userResponse = { ...user };
    delete userResponse.password;

    return NextResponse.json({
      message: 'Login successful',
      user: userResponse
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);

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
