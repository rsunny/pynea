import { Neogma } from 'neogma';

const url = process.env.NEO4j_URL || 'bolt://localhost:7687';
const username = process.env.NEO4J_USERNAME || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'Test123@';

export const neogma: Neogma = new Neogma(
  {
    url,
    username,
    password,
  },
  {
    logger: console.log,
    encrypted: false,
  }
);
