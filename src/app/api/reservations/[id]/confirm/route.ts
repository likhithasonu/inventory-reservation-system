import { NextResponse } from 'next/server';

export async function POST() {

  return NextResponse.json({
    id: 'res_001',
    status: 'CONFIRMED',
    message: 'Reservation confirmed successfully',
  });

}