import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

export type Page = {
  pageSize: number
  pageNum: number
}