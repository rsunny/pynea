import { neogma } from '../utils/dbDriver';
import { ModelFactory, NeogmaInstance } from 'neogma';

export type SweetsPropertiesI = {
  name: string;
  ingredients: string[];
  price: number;
  quantityInStock: number;
};

export interface SweetsRelatedNodesI {}

export type SweetsInstance = NeogmaInstance<
  SweetsPropertiesI,
  SweetsRelatedNodesI
>;

export const Sweets = ModelFactory<SweetsPropertiesI, SweetsRelatedNodesI>(
  {
    label: 'Sweet',
    primaryKeyField: 'name',
    schema: {
      name: {
        type: 'string',
        required: true,
      },
      ingredients: {
        type: 'array',
        required: true,
      },
      price: {
        type: 'number',
        minimum: 0,
        required: true,
      },
      quantityInStock: {
        type: 'number',
        minimum: 0,
        required: true,
      },
    },
  },
  neogma
);
