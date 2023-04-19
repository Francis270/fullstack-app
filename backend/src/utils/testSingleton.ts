import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client'

import db from '../db';

jest.mock('./client', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>()
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;