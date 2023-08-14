import { queryRunner } from './queryRunner';

export const cleanDb = async () => {
  await queryRunner.run(`MATCH (n) DETACH DELETE n`);
};
