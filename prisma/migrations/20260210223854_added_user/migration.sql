-- CreateTable
CREATE TABLE "public"."telegram_users" (
    "telegram_id" INTEGER NOT NULL,
    "accepted_disclaimer" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "telegram_users_pkey" PRIMARY KEY ("telegram_id")
);

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_telegram_user_id_fkey" FOREIGN KEY ("telegram_user_id") REFERENCES "public"."telegram_users"("telegram_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."facts" ADD CONSTRAINT "facts_telegram_user_id_fkey" FOREIGN KEY ("telegram_user_id") REFERENCES "public"."telegram_users"("telegram_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."insights" ADD CONSTRAINT "insights_telegram_user_id_fkey" FOREIGN KEY ("telegram_user_id") REFERENCES "public"."telegram_users"("telegram_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."events" ADD CONSTRAINT "events_telegram_user_id_fkey" FOREIGN KEY ("telegram_user_id") REFERENCES "public"."telegram_users"("telegram_id") ON DELETE CASCADE ON UPDATE CASCADE;
