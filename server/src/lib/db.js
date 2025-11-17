// This pattern is used to avoid multiple PrismaClient instances.
import {PrismaClient, prismaClient} from "@prisma/client"

const globalForPrisma = global
const prisma = new PrismaClient();

if(process.env.NODE_EBV !== "production") globalForPrisma.prisma = prisma

export default prisma