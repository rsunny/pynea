import { Request, Response } from 'express';
import { Orders } from '../models/order';
import { Sweets } from '../models/sweet';
import { queryRunner } from '../utils/queryRunner';

export const addOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, customerName, status } = req.body;
    await Orders.createOne({ orderId, customerName, status });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const contains = async (req: Request, res: Response) => {
  try {
    const { orderId, name } = req.body;

    const order = await Orders.findOne({ where: { orderId } });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const sweet = await Sweets.findOne({ where: { name } });
    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    await order.relateTo({
      alias: 'ContainsSweet',
      where: { name },
    });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const ListOrdersByPendingOrDelivered = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await queryRunner.run(
      `MATCH (o:Order) WHERE o.status = "pending" or o.status = "delivered" RETURN o`
    );
    const orders = result.records.map((record) => record.get('o').properties);
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
