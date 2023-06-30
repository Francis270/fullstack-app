import { PrismaClient } from '@prisma/client';
import { env } from './utils/config';

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

if (env.NODE_ENV === 'production') {
    db = new PrismaClient();
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
    }
    db = global.__db;
}

export default db;