import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Student from '../../../models/Student';
import User from '../../../models/User';

export async function GET() {
  try {
    await dbConnect();

    const students = await Student.find({})
      .populate('assignedProject')
      .sort({ createdAt: -1 });

    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, matricNumber, email, department, preference, password } = body;

    if (!name || !matricNumber || !email || !department || !preference || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ $or: [{ matricNumber }, { email }] });
    if (existingStudent) {
      return NextResponse.json(
        { error: 'Student with this matriculation number or email already exists' },
        { status: 409 }
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

    // Create user account first
    const userData = {
      name,
      email,
      password,
      role: 'student',
      department,
      matricNumber
    };

    const user = new User(userData);
    const savedUser = await user.save();

    // Create student record
    const newStudent = await Student.create({
      name,
      matricNumber,
      email,
      department,
      preference
    });

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
