import { neogma } from '../utils/dbDriver';
import { ModelFactory, NeogmaInstance, ModelRelatedNodesI } from 'neogma';
import { Sweets, SweetsInstance } from './sweet';

export type MachinesPropertiesI = {
  machineId: string;
  type: string;
  capacity: number;
  status: string;
};

export interface MachinesRelatedNodesI {
  ProducesSweet: ModelRelatedNodesI<typeof Sweets, SweetsInstance>;
}

export type MachinesInstance = NeogmaInstance<
  MachinesPropertiesI,
  MachinesRelatedNodesI
>;

export const Machines = ModelFactory<
  MachinesPropertiesI,
  MachinesRelatedNodesI
>(
  {
    label: 'Machine',
    primaryKeyField: 'machineId',
    schema: {
      machineId: {
        type: 'string',
        required: true,
      },
      type: {
        type: 'string',
        required: true,
      },
      capacity: {
        type: 'number',
        minimum: 0,
        required: true,
      },
      status: {
        type: 'string',
        required: true,
      },
    },
    relationships: {
      ProducesSweet: {
        model: Sweets,
        direction: 'out',
        name: 'PRODCUES',
      },
    },
  },
  neogma
);
