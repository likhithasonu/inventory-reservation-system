import { NextResponse } from 'next/server';

export async function GET() {

  return NextResponse.json([
    {
      id: '1',
      name: 'Mumbai Warehouse',
      location: 'Mumbai, India',
    },
    {
      id: '2',
      name: 'Hyderabad Warehouse',
      location: 'Hyderabad, India',
    },
  ]);

}