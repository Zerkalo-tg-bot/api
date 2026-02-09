import { PrismaService } from "@/modules/prisma/prisma.service";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Resets the chat state for a given Telegram user by deleting all their messages.
   * @param telegramUserId The Telegram user ID
   * @returns A promise that resolves when the chat state is reset
   */
  async resetChatState(telegramUserId: number) {
    try {
      return Promise.all([
        this.prisma.message.deleteMany({
          where: { telegramUserId },
        }),
        this.prisma.fact.deleteMany({
          where: { telegramUserId },
        }),
      ]);
    } catch (error) {
      console.error(`Failed to reset chat state for user ${telegramUserId}:`, error);
      throw new InternalServerErrorException(`Failed to reset chat state`);
    }
  }
}
