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
        {
          warehouseId: '2',
          warehouse: 'Hyderabad Warehouse',
          totalStock: 5,
          reservedStock: 1,
          availableStock: 4,
        },
      ],
    },

    {
      id: '2',
      name: 'Mechanical Keyboard',
      stock: [
        {
          warehouseId: '1',
          warehouse: 'Mumbai Warehouse',
          totalStock: 7,
          reservedStock: 3,
          availableStock: 4,
        },
      ],
    },
  ]);

}