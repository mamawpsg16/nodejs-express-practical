import express from 'express';
import userRoutes from './userRoutes.js';
import contactRoutes from './contactRoutes.js';

const router = express.Router();

// Register the route modules under their respective paths
router.use('/', userRoutes);
router.use('/contacts', contactRoutes);

export default router;
