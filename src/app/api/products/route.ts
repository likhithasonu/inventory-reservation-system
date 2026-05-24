import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {

  try {

    const products = await prisma.product.findMany({
      include: {
        inventories: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,

      stock: product.inventories.map((inventory) => ({
        warehouseId: inventory.warehouse.id,
        warehouse: inventory.warehouse.name,
        totalStock: inventory.totalStock,
        reservedStock: inventory.reservedStock,
        availableStock:
          inventory.totalStock - inventory.reservedStock,
      })),
    }));

    return NextResponse.json(formattedProducts);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}