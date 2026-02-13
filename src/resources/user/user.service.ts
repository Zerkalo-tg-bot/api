import { PrismaService } from "@modules/prisma";
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { UpdateDisclaimerDto } from "./dto/update-disclaimer.dto";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  async updateUserDisclaimer(telegramUserId: number, updateDisclaimerDto: UpdateDisclaimerDto) {
    await this.getUser(telegramUserId);
    try {
      return await this.prisma.user.update({
        where: { telegramId: telegramUserId },
        data: { acceptedDisclaimer: updateDisclaimerDto.acceptedDisclaimer },
      });
    } catch (error) {
      this.logger.error(`Failed to update disclaimer for user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to update disclaimer`);
    }
  }

  async getUser(telegramUserId: number) {
    let user: User | null = null;
    try {
      user = await this.prisma.user.findUnique({
        where: { telegramId: telegramUserId },
      });
    } catch (error) {
      this.logger.error(`Failed to fetch user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to fetch user`);
    }

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async createUser(telegramUserId: number) {
    const user = await this.getUserIfExists(telegramUserId);
    if (user) {
      throw new ConflictException(`User with telegram ID ${telegramUserId} already exists`);
    }
    try {
      return await this.prisma.user.create({
        data: { telegramId: telegramUserId },
      });
    } catch (error) {
      this.logger.error(`Failed to create user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to create user`);
    }
  }

  async getUserIfExists(telegramUserId: number) {
    try {
      return await this.prisma.user.findUnique({
        where: { telegramId: telegramUserId },
      });
    } catch (error) {
      this.logger.error(`Failed to fetch user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to fetch user`);
    }
  }

  async ensureUser(telegramUserId: number) {
    try {
      return await this.prisma.user.upsert({
        where: { telegramId: telegramUserId },
        create: { telegramId: telegramUserId },
        update: {},
      });
    } catch (error) {
      this.logger.error(`Failed to ensure user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to ensure user`);
    }
  }
}
