import { Request, Response } from 'express';
import { Machines } from '../models/machine';
import { Sweets } from '../models/sweet';
import { queryRunner } from '../utils/queryRunner';

export const addMachine = async (req: Request, res: Response) => {
  try {
    const { machineId, type, capacity, status } = req.body;

    await Machines.createOne({ machineId, type, capacity, status });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const produce = async (req: Request, res: Response) => {
  try {
    const { machineId, name } = req.body;

    const machine = await Machines.findOne({ where: { machineId } });
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }

    const sweet = await Sweets.findOne({ where: { name } });
    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    await machine.relateTo({
      alias: 'ProducesSweet',
      where: { name },
    });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const listSweetsByMachine = async (req: Request, res: Response) => {
  try {
    const machineId = req.params.machineId;

    const machine = await Machines.findOne({ where: { machineId } });

    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }

    const result = await queryRunner.run(
      `MATCH (m:Machine)-[:PRODCUES]->(s:Sweet) WHERE m.machineId = $machineId RETURN s`,
      { machineId }
    );
    const sweets = result.records.map((record) => record.get('s').properties);
    res.status(200).json({ sweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
