/*
  Warnings:

  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `facts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `insights` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."events" DROP CONSTRAINT "events_telegram_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."facts" DROP CONSTRAINT "facts_telegram_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."insights" DROP CONSTRAINT "insights_telegram_user_id_fkey";

-- DropTable
DROP TABLE "public"."events";

-- DropTable
DROP TABLE "public"."facts";

-- DropTable
DROP TABLE "public"."insights";
