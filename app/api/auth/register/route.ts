import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

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
    const existingUser = await User.findOne({ email });
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
      password,
      role
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
    const user = new User(userData);
    const savedUser = await user.save();

    // Return user data without password
    let userResponse;
    
    // Handle both mongoose models and our mock models
    if (typeof savedUser.toObject === 'function') {
      userResponse = savedUser.toObject();
    } else {
      // For mock database
      userResponse = { ...savedUser };
    }
    
    delete userResponse.password;

    return NextResponse.json({
      message: 'User created successfully',
      user: userResponse
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Registration error:', error);
    
    // Provide more detailed error messages
    if (error instanceof mongoose.Error.ValidationError) {
      // Mongoose validation error
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: validationErrors },
        { status: 400 }
      );
    } else if (error instanceof Error && 'code' in error && error.code === 11000) {
      // Duplicate key error (MongoDB)
      // Cast to unknown first to avoid TypeScript error
      const mongoError = error as unknown as { keyValue: Record<string, unknown> };
      
      // Check if keyValue exists before accessing it
      if (mongoError && 'keyValue' in mongoError) {
        const field = Object.keys(mongoError.keyValue)[0];
        return NextResponse.json(
          { error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` },
          { status: 409 }
        );
      }
      
      // Fallback for when keyValue is not available
      return NextResponse.json(
        { error: 'A duplicate entry already exists' },
        { status: 409 }
      );
    } else {
      // Other errors
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
}
