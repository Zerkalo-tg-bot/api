import { PrismaService } from "@/modules/prisma/prisma.service";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "../user/user.service";

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async startChatSession(telegramUserId: number) {
    let user: User | null = null;
    try {
      user = await this.userService.getUser(telegramUserId);
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        console.error(`Failed to fetch user ${telegramUserId}:`, error);
        throw new InternalServerErrorException(`Failed to fetch user`);
      }
    }

    if (!user) {
      user = await this.userService.createUser(telegramUserId);
    }

    return user;
  }

  /**
   * Resets the chat state for a given Telegram user by deleting all their messages.
   * @param telegramUserId The Telegram user ID
   * @returns A promise that resolves when the chat state is reset
   */
  async resetChatState(telegramUserId: number) {
    try {
      await this.prisma.message.deleteMany({
        where: { telegramUserId },
      });
    } catch (error) {
      console.error(`Failed to reset chat state for user ${telegramUserId}:`, error);
      throw new InternalServerErrorException(`Failed to reset chat state`);
    }
  }
}
