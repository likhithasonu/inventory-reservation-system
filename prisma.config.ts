import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Load variables from your .env file
dotenv.config();

export default defineConfig({
  earlyAccess: true,
  datasource: {
    url: process.env.DATABASE_URL,
  },
  // This tells Prisma 7 exactly how to run your seed file!
  migrations: {
    seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
});