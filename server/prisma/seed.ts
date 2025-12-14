import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample sweets
  const sweets = [
    {
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 2.99,
      quantity: 50,
    },
    {
      name: 'Gummy Bears',
      category: 'Gummies',
      price: 1.99,
      quantity: 75,
    },
    {
      name: 'Lollipop',
      category: 'Hard Candy',
      price: 0.99,
      quantity: 100,
    },
    {
      name: 'Caramel Candy',
      category: 'Caramel',
      price: 3.49,
      quantity: 30,
    },
    {
      name: 'Jelly Beans',
      category: 'Jelly',
      price: 2.49,
      quantity: 60,
    },
    {
      name: 'Marshmallows',
      category: 'Soft',
      price: 1.79,
      quantity: 40,
    },
    {
      name: 'Licorice',
      category: 'Licorice',
      price: 2.29,
      quantity: 25,
    },
    {
      name: 'Rock Candy',
      category: 'Hard Candy',
      price: 1.49,
      quantity: 35,
    },
  ];

  // Clear existing sweets
  await prisma.sweet.deleteMany({});

  // Create new sweets
  for (const sweet of sweets) {
    await prisma.sweet.create({
      data: sweet,
    });
  }

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

