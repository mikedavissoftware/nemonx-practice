import "dotenv/config";
import { definePrismaConfig } from "prisma/config";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma", // Point to the separate TypeScript contract file
    db: {
      connection: process.env.DATABASE_URL!,
    },
  }),
}) as any;

