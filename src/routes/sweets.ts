import express from 'express';
import {
  addSweet,
  listOrdersBySweet,
  listSweetsByQuantity,
} from '../controllers/sweets';

const router = express.Router();

/**
 * @swagger
 * /sweets:
 *   post:
 *     summary: Add a new sweet
 *     tags: [Sweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *               quantityInStock:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Sweet added successfully
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
router.post('', addSweet);

/**
 * @swagger
 * /sweets/orders:
 *   get:
 *     summary: List orders containing a specific sweet
 *     tags: [Sweets]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name of the sweet
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of orders containing the sweet
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
 *       '404':
 *         description: Sweet not found
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
router.get('/orders', listOrdersBySweet);

/**
 * @swagger
 * /sweets/quantity:
 *   get:
 *     summary: List sweets with quantity less than a given number
 *     tags: [Sweets]
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: true
 *         description: Quantity threshold
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: List of sweets with quantity less than the threshold
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sweets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: string
 *                       price:
 *                         type: number
 *                       quantityInStock:
 *                         type: number
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
router.get('/quantity', listSweetsByQuantity);

export default router;
