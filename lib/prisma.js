import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const createPrismaClient = () => {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  return new PrismaClient();
};

const prismaProxy = new Proxy(
  {},
  {
    get(_target, prop) {
      if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = createPrismaClient();
      }

      if (!globalForPrisma.prisma) {
        throw new Error("DATABASE_URL is not configured for Prisma.");
      }

      return globalForPrisma.prisma[prop];
    },
  }
);

export default prismaProxy;