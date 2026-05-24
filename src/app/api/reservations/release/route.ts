import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    if (reservation.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Reservation already processed' },
        { status: 400 }
      );
    }

    // release reserved stock
    await prisma.inventory.updateMany({
      where: {
        productId: reservation.productId,
        warehouseId: reservation.warehouseId,
      },

      data: {
        reservedStock: {
          decrement: reservation.quantity,
        },
      },
    });

    // update reservation status
    const updatedReservation =
      await prisma.reservation.update({
        where: {
          id: reservation.id,
        },

        data: {
          status: 'RELEASED',
        },
      });

    return NextResponse.json(updatedReservation);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}