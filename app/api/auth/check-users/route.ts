import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function GET() {
  try {
    await dbConnect();
    const userCount = await User.countDocuments();

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
