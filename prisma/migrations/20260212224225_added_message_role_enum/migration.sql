/*
  Warnings:

  - Changed the type of `role` on the `messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."MessageRole" AS ENUM ('system', 'user', 'assistant');

-- AlterTable
ALTER TABLE "public"."messages" DROP COLUMN "role",
ADD COLUMN     "role" "public"."MessageRole" NOT NULL;
