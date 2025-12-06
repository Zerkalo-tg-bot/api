import { PrismaService } from "@/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async resetChatState(telegramUserId: number) {
    return this.prisma.message.deleteMany({
      where: { telegramUserId },
    });
  }
}
