import { NextResponse } from 'next/server';

export async function POST() {

  return NextResponse.json({
    id: '1',
    status: 'PENDING',
  });

}