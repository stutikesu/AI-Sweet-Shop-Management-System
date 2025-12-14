import request from 'supertest';
import app from '../src/index';

describe('Sweets API', () => {
  describe('POST /api/sweets', () => {
    it('should fail without Admin token', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 5.99,
        quantity: 100,
      };

      await request(app)
        .post('/api/sweets')
        .send(sweetData)
        .expect(401);
    });
  });

  describe('GET /api/sweets', () => {
    it('should allow public access and return list of sweets', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should decrease inventory when purchasing a sweet', async () => {
      // First, we need to create a sweet (this will require admin auth in implementation)
      // For now, we'll test with a mock ID
      const sweetId = 'test-sweet-id';
      const initialQuantity = 100;
      const purchaseQuantity = 5;

      // This test will fail initially as the endpoint doesn't exist
      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .send({ quantity: purchaseQuantity })
        .expect(200);

      expect(response.body).toHaveProperty('quantity');
      expect(response.body.quantity).toBe(initialQuantity - purchaseQuantity);
    });
  });
});

