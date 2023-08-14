import { neogma } from '../utils/dbDriver';
import { ModelFactory, NeogmaInstance, ModelRelatedNodesI } from 'neogma';
import { Sweets, SweetsInstance } from './sweet';

export type OrdersPropertiesI = {
  orderId: string;
  customerName: string;
  status: string;
};

export interface OrdersRelatedNodesI {
  ContainsSweet: ModelRelatedNodesI<typeof Sweets, SweetsInstance>;
}

export type OrdersInstance = NeogmaInstance<
  OrdersPropertiesI,
  OrdersRelatedNodesI
>;

export const Orders = ModelFactory<OrdersPropertiesI, OrdersRelatedNodesI>(
  {
    label: 'Order',
    primaryKeyField: 'orderId',
    schema: {
      orderId: {
        type: 'string',
        required: true,
      },
      customerName: {
        type: 'string',
        required: true,
      },
      status: {
        type: 'string',
        required: true,
      },
    },
    relationships: {
      ContainsSweet: {
        model: Sweets,
        direction: 'out',
        name: 'CONTAINS',
      },
    },
  },
  neogma
);
