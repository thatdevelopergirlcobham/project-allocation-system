import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import { getAll } from '../../../../lib/dummyData';

export async function GET() {
  try {
    await dbConnect();
    const users = getAll('users');
    const userCount = users.length;

    return NextResponse.json(
      { userCount },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error checking users:', error);
    // Return error but allow access for initial setup
    return NextResponse.json(
      { userCount: 0 },
      { status: 500 }
    );
  }
}
