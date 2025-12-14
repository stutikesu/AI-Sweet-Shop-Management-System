import { Router } from 'express';
import { SweetController } from '../controllers/SweetController';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware';

const router = Router();
const sweetController = new SweetController();

router.post(
  '/',
  authenticateToken,
  requireAdmin,
  (req, res) => {
    sweetController.create(req, res);
  }
);

router.get('/', (req, res) => {
  sweetController.findAll(req, res);
});

router.get('/search', (req, res) => {
  sweetController.search(req, res);
});

router.post(
  '/:id/purchase',
  authenticateToken,
  (req, res) => {
    sweetController.purchase(req, res);
  }
);

router.post(
  '/:id/restock',
  authenticateToken,
  requireAdmin,
  (req, res) => {
    sweetController.restock(req, res);
  }
);

router.put(
  '/:id',
  authenticateToken,
  requireAdmin,
  (req, res) => {
    sweetController.update(req, res);
  }
);

router.delete(
  '/:id',
  authenticateToken,
  requireAdmin,
  (req, res) => {
    sweetController.delete(req, res);
  }
);

export default router;

