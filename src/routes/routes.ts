import { Application } from 'express';
import machines from './machines';
import orders from './orders';
import sweets from './sweets';

export const applyRoutes = (app: Application) => {
  app.use('/machines', machines);
  app.use('/orders', orders);
  app.use('/sweets', sweets);
};
