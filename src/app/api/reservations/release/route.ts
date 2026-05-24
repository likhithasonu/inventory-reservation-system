import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const { id } = body;

    const reservation = await prisma.reservation.update({
      where: {
        id,
      },

      data: {
        status: 'RELEASED',
      },
    });

    return NextResponse.json(reservation);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: 'Failed to release reservation' },
      { status: 500 }
    );
  }
}