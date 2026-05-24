import { NextResponse } from 'next/server';

export async function GET() {

  return NextResponse.json([
    {
      id: '1',
      name: 'Wireless Headphones',
      stock: [
        {
          warehouseId: '1',
          warehouse: 'Mumbai Warehouse',
          totalStock: 10,
          reservedStock: 2,
          availableStock: 8,
        },
      ],
    },
  ]);

}