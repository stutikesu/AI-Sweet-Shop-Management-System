import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function showData() {
  try {
    console.log('\n=== USERS DATA ===\n');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (users.length === 0) {
      console.log('No users found in database.');
    } else {
      console.log(`Total Users: ${users.length}\n`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. User:`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Created: ${user.createdAt}`);
        console.log('');
      });
    }

    console.log('\n=== SWEETS DATA ===\n');
    const sweets = await prisma.sweet.findMany({
      orderBy: { name: 'asc' },
    });

    if (sweets.length === 0) {
      console.log('No sweets found in database.');
    } else {
      console.log(`Total Sweets: ${sweets.length}\n`);
      sweets.forEach((sweet, index) => {
        console.log(`${index + 1}. ${sweet.name}:`);
        console.log(`   ID: ${sweet.id}`);
        console.log(`   Category: ${sweet.category}`);
        console.log(`   Price: $${sweet.price.toFixed(2)}`);
        console.log(`   Quantity: ${sweet.quantity}`);
        console.log(`   Created: ${sweet.createdAt}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

showData();

