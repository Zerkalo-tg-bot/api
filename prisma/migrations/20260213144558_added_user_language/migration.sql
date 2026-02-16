-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('en', 'ru', 'pl');

-- AlterTable
ALTER TABLE "public"."telegram_users" ADD COLUMN     "language" "public"."Language" NOT NULL DEFAULT 'en';
