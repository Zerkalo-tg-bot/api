-- CreateTable
CREATE TABLE "public"."facts" (
    "id" SERIAL NOT NULL,
    "telegram_user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."insights" (
    "id" SERIAL NOT NULL,
    "telegram_user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."events" (
    "id" SERIAL NOT NULL,
    "telegram_user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "facts_telegram_user_id_idx" ON "public"."facts"("telegram_user_id");

-- CreateIndex
CREATE INDEX "insights_telegram_user_id_idx" ON "public"."insights"("telegram_user_id");

-- CreateIndex
CREATE INDEX "events_telegram_user_id_idx" ON "public"."events"("telegram_user_id");
