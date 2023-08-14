import express from 'express';
import {
  addMachine,
  produce,
  listSweetsByMachine,
} from '../controllers/machines';

const router = express.Router();

/**
 * @swagger
 * /machines:
 *   post:
 *     summary: Add a new machine
 *     tags: [Machines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               machineId:
 *                 type: string
 *               type:
 *                 type: string
 *               capacity:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Machine added successfully
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

router.post('/', addMachine);

/**
 * @swagger
 * /machines/produce:
 *   post:
 *     summary: Create a ProducesSweet relationship between an existing machine to a sweet
 *     tags: [Machines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               machineId:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: PRODCUES relationship created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *       '404':
 *         description: Machine or sweet not found
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
router.post('/produce', produce);

/**
 * @swagger
 * /machines/{machineId}/sweets:
 *   get:
 *     summary: List sweets produced by a specific machine
 *     tags: [Machines]
 *     parameters:
 *       - in: path
 *         name: machineId
 *         required: true
 *         description: ID of the machine
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of sweets produced by the machine
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
 *       '404':
 *         description: Machine not found
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
router.get('/:machineId/sweets', listSweetsByMachine);

export default router;
