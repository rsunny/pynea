import express from 'express';
import {
  addOrder,
  contains,
  ListOrdersByPendingOrDelivered,
} from '../controllers/orders';

const router = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               customerName:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Order added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *       '500':
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('', addOrder);

/**
 * @swagger
 * /orders/contains:
 *   post:
 *     summary: Create a ContainsSweet relationship between an existing machine to a sweet
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: CONTIANS relationship created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *       '404':
 *         description: Order or sweet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/contains', contains);

/**
 * @swagger
 * /orders/pending_or_delivered:
 *   get:
 *     summary: List orders in pending or delivered state
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: List of orders in pending or delivered state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: string
 *                       customerName:
 *                         type: string
 *                       status:
 *                         type: string
 *       '500':
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/pending_or_delivered', ListOrdersByPendingOrDelivered);

export default router;
