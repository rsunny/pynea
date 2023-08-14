import { Request, Response } from 'express';
import { Sweets } from '../models/sweet';
import { queryRunner } from '../utils/queryRunner';

export const addSweet = async (req: Request, res: Response) => {
  try {
    const { name, ingredients, price, quantityInStock } = req.body;
    await Sweets.createOne({ name, ingredients, price, quantityInStock });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const listOrdersBySweet = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    const sweet = await Sweets.findOne({ where: { name } });

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    const result = await queryRunner.run(
      `MATCH (o:Order)-[:CONTAINS]->(s:Sweet) WHERE s.name = $name RETURN o`,
      { name }
    );
    const orders = result.records.map((record) => record.get('o').properties);
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const listSweetsByQuantity = async (req: Request, res: Response) => {
  try {
    const quantity = req.query.quantity as string;
    const quantityInStock = parseInt(quantity as string, 10);

    const result = await queryRunner.run(
      `MATCH (s:Sweet) WHERE s.quantityInStock < $quantityInStock RETURN s`,
      { quantityInStock }
    );
    const sweets = result.records.map((record) => record.get('s').properties);
    res.status(200).json({ sweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
