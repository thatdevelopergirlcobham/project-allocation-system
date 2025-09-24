import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

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
    const user = await User.findOne({ email, role });
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
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user data without password
    let userResponse;
    
    // Handle both mongoose models and our mock models
    if (typeof user.toObject === 'function') {
      userResponse = user.toObject();
    } else {
      // For mock database
      userResponse = { ...user };
    }
    
    delete userResponse.password;

    return NextResponse.json({
      message: 'Login successful',
      user: userResponse
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    
    // Create a more helpful error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: errorMessage,
        mockDb: process.env.USE_MOCK_DB === 'true' ? 'Using mock database' : 'Using real database'
      },
      { status: 500 }
    );
  }
}
