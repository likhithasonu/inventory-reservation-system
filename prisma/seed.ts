import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // delete old data
  await prisma.reservation.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.warehouse.deleteMany();

  // products
  const headphones = await prisma.product.create({
    data: {
      name: 'Wireless Headphones',
    },
  });

  const keyboard = await prisma.product.create({
    data: {
      name: 'Mechanical Keyboard',
    },
  });

  // warehouses
  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: 'Mumbai Warehouse',
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: 'Hyderabad Warehouse',
    },
  });

  // inventory
  await prisma.inventory.createMany({
    data: [
      {
        productId: headphones.id,
        warehouseId: warehouse1.id,
        totalStock: 10,
      },
      {
        productId: headphones.id,
        warehouseId: warehouse2.id,
        totalStock: 5,
      },
      {
        productId: keyboard.id,
        warehouseId: warehouse1.id,
        totalStock: 7,
      },
    ],
  });

  console.log('✅ Database seeded');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });