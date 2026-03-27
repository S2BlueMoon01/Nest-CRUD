import { Injectable } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from 'generated/prisma/client';
import { resolve } from 'node:path';

function getRuntimeDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }

  if (!databaseUrl.startsWith('file:./')) {
    return databaseUrl;
  }

  // Prisma resolves relative SQLite paths from prisma/schema.prisma.
  // Align adapter runtime resolution with that behavior.
  const relativePath = databaseUrl.slice('file:'.length);
  const absolutePath = resolve(process.cwd(), 'prisma', relativePath);
  return `file:${absolutePath.replace(/\\/g, '/')}`;
}

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: getRuntimeDatabaseUrl() });
    super({ adapter });
  }
}
