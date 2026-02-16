import { PrismaService } from "@modules/prisma";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { UserService } from "@resources/user";
import { mapPrismaLanguageToLanguage } from "@/core";
import type { UserResponseDto } from "@resources/user/dto/user-response.dto";

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async startChatSession(telegramUserId: number): Promise<UserResponseDto> {
    const user = await this.userService.ensureUser(telegramUserId);
    return {
      ...user,
      language: mapPrismaLanguageToLanguage(user.language),
    };
  }

  /**
   * Resets the chat state for a given Telegram user by deleting all their messages.
   * @param telegramUserId The Telegram user ID
   * @returns A promise that resolves when the chat state is reset
   */
  async resetChatState(telegramUserId: number) {
    const user = await this.userService.getUserIfExists(telegramUserId);
    if (!user) return;

    try {
      await this.prisma.$transaction([
        this.prisma.message.deleteMany({
          where: { telegramUserId },
        }),
        this.prisma.user.update({
          where: { telegramId: telegramUserId },
          data: { acceptedDisclaimer: false },
        }),
      ]);
    } catch (error) {
      this.logger.error(`Failed to reset chat state for user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to reset chat state`);
    }
  }
}
