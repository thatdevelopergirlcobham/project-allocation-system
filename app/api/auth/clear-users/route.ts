import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import { getAll } from '../../../../lib/dummyData';

export async function GET() {
  try {
    await dbConnect();
    const users = getAll('users');

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

    // For dummy data, we can't actually delete, so just return success
    return NextResponse.json({
      message: 'Users cleared (dummy data)',
      deletedCount: 0
    });
  } catch (error) {
    console.error('Error deleting users:', error);
    return NextResponse.json(
      { error: 'Failed to delete users' },
      { status: 500 }
    );
  }
}
