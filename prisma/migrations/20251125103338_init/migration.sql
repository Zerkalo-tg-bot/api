-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "telegram_user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "messages_telegram_user_id_idx" ON "messages"("telegram_user_id");
