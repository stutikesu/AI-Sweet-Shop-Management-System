import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { SweetService } from '../services/SweetService';

const sweetService = new SweetService();

export class SweetController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name, category, price, quantity } = req.body;

      if (!name || !category || price === undefined || quantity === undefined) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      const sweet = await sweetService.create({
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });

      res.status(201).json(sweet);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async findAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const sweets = await sweetService.findAll();
      res.status(200).json(sweets);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async search(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name, category, minPrice, maxPrice } = req.query;

      const searchQuery: any = {};
      if (name) searchQuery.name = name as string;
      if (category) searchQuery.category = category as string;
      if (minPrice) searchQuery.minPrice = parseFloat(minPrice as string);
      if (maxPrice) searchQuery.maxPrice = parseFloat(maxPrice as string);

      const sweets = await sweetService.search(searchQuery);
      res.status(200).json(sweets);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async purchase(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        res.status(400).json({ error: 'Valid quantity is required' });
        return;
      }

      const sweet = await sweetService.purchase(id, parseInt(quantity));
      res.status(200).json(sweet);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Sweet not found') {
          res.status(404).json({ error: error.message });
          return;
        }
        if (error.message === 'Insufficient quantity') {
          res.status(400).json({ error: error.message });
          return;
        }
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async restock(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        res.status(400).json({ error: 'Valid quantity is required' });
        return;
      }

      const sweet = await sweetService.restock(id, parseInt(quantity));
      res.status(200).json(sweet);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Sweet not found') {
          res.status(404).json({ error: error.message });
          return;
        }
        if (error.message === 'Restock quantity must be greater than 0') {
          res.status(400).json({ error: error.message });
          return;
        }
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, category, price, quantity } = req.body;

      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (category !== undefined) updateData.category = category;
      if (price !== undefined) updateData.price = parseFloat(price);
      if (quantity !== undefined) updateData.quantity = parseInt(quantity);

      const sweet = await sweetService.update(id, updateData);
      res.status(200).json(sweet);
    } catch (error) {
      if (error instanceof Error && error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await sweetService.delete(id);
      res.status(200).json({ message: 'Sweet deleted successfully' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Sweet not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

