// This pattern is used to avoid multiple PrismaClient instances.
import {PrismaClient} from "@prisma/client"
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined}
const prisma = new PrismaClient({
    adapter: {
        url: process.env.DATABASE_URL as string,
    },
});

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma