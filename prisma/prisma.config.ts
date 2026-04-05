// @ts-nocheck
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join(__dirname, "schema.prisma"),
  migrate: {
    async url() {
      return process.env.DATABASE_URL ?? "postgresql://ufa:ufa_password@localhost:5432/ufa_website";
    },
  },
});
