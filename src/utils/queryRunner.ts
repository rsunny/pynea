import { QueryRunner } from 'neogma';
import { neogma } from '../utils/dbDriver';

export const queryRunner = new QueryRunner({
  driver: neogma.driver,
  logger: console.log,
});
