import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateSweetDto {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface PurchaseSweetDto {
  quantity: number;
}

export class SweetService {
  async create(data: CreateSweetDto) {
    return await prisma.sweet.create({
      data,
    });
  }

  async findAll() {
    return await prisma.sweet.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async search(query: { name?: string; category?: string; minPrice?: number; maxPrice?: number }) {
    const where: any = {};

    if (query.name) {
      // SQLite doesn't support case-insensitive mode, so we use contains with case conversion
      where.name = { contains: query.name };
    }

    if (query.category) {
      where.category = { contains: query.category };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.price = {};
      if (query.minPrice !== undefined) {
        where.price.gte = query.minPrice;
      }
      if (query.maxPrice !== undefined) {
        where.price.lte = query.maxPrice;
      }
    }

    const results = await prisma.sweet.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Filter case-insensitively for SQLite
    let filtered = results;
    if (query.name) {
      const nameLower = query.name.toLowerCase();
      filtered = filtered.filter(s => s.name.toLowerCase().includes(nameLower));
    }
    if (query.category) {
      const categoryLower = query.category.toLowerCase();
      filtered = filtered.filter(s => s.category.toLowerCase().includes(categoryLower));
    }

    return filtered;
  }

  async findById(id: string) {
    return await prisma.sweet.findUnique({
      where: { id },
    });
  }

  async purchase(id: string, quantity: number) {
    const sweet = await prisma.sweet.findUnique({
      where: { id },
    });

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (sweet.quantity < quantity) {
      throw new Error('Insufficient quantity');
    }

    return await prisma.sweet.update({
      where: { id },
      data: {
        quantity: sweet.quantity - quantity,
      },
    });
  }

  async restock(id: string, quantity: number) {
    const sweet = await prisma.sweet.findUnique({
      where: { id },
    });

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    if (quantity <= 0) {
      throw new Error('Restock quantity must be greater than 0');
    }

    return await prisma.sweet.update({
      where: { id },
      data: {
        quantity: sweet.quantity + quantity,
      },
    });
  }

  async update(id: string, data: Partial<CreateSweetDto>) {
    const sweet = await prisma.sweet.findUnique({
      where: { id },
    });

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    return await prisma.sweet.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const sweet = await prisma.sweet.findUnique({
      where: { id },
    });

    if (!sweet) {
      throw new Error('Sweet not found');
    }

    return await prisma.sweet.delete({
      where: { id },
    });
  }
}

