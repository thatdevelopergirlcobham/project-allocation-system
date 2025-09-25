import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}, 'name email role matricNumber department specialization createdAt').sort({ createdAt: -1 });

    return NextResponse.json({
      users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await dbConnect();

    // Delete all users (for testing purposes)
    const result = await User.deleteMany({});

    return NextResponse.json({
      message: `Deleted ${result.deletedCount} users`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting users:', error);
    return NextResponse.json(
      { error: 'Failed to delete users' },
      { status: 500 }
    );
  }
}
