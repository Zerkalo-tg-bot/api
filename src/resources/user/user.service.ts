import { PrismaService } from "@modules/prisma";
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { UpdateDisclaimerDto } from "./dto/update-disclaimer.dto";
import { User } from "@prisma/client";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { mapLanguageToPrismaLanguage, mapPrismaLanguageToLanguage } from "@/core";
import { UserResponseDto } from "./dto/user-response.dto";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  async updateUserDisclaimer(telegramUserId: number, updateDisclaimerDto: UpdateDisclaimerDto): Promise<UserResponseDto> {
    await this.getUser(telegramUserId);
    try {
      const user = await this.prisma.user.update({
        where: { telegramId: telegramUserId },
        data: { acceptedDisclaimer: updateDisclaimerDto.acceptedDisclaimer },
      });
      return {
        ...user,
        language: mapPrismaLanguageToLanguage(user.language),
      };
    } catch (error) {
      this.logger.error(`Failed to update disclaimer for user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to update disclaimer`);
    }
  }

  async getUser(telegramUserId: number): Promise<UserResponseDto> {
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
    return {
      ...user,
      language: mapPrismaLanguageToLanguage(user.language),
    };
  }

  async updateUserLanguage(telegramUserId: number, updateLanguageDto: UpdateLanguageDto): Promise<UserResponseDto> {
    await this.getUser(telegramUserId);
    try {
      const prismaLang = mapLanguageToPrismaLanguage(updateLanguageDto.language);
      const user = await this.prisma.user.update({
        where: { telegramId: telegramUserId },
        data: { language: prismaLang },
      });
      return {
        ...user,
        language: mapPrismaLanguageToLanguage(user.language),
      };
    } catch (error) {
      this.logger.error(`Failed to update language for user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to update language`);
    }
  }

  async createUser(telegramUserId: number): Promise<UserResponseDto> {
    const user = await this.getUserIfExists(telegramUserId);
    if (user) {
      throw new ConflictException(`User with telegram ID ${telegramUserId} already exists`);
    }
    try {
      const user = await this.prisma.user.create({
        data: { telegramId: telegramUserId },
      });
      return {
        ...user,
        language: mapPrismaLanguageToLanguage(user.language),
      };
    } catch (error) {
      this.logger.error(`Failed to create user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to create user`);
    }
  }

  async getUserIfExists(telegramUserId: number): Promise<UserResponseDto | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { telegramId: telegramUserId },
      });
      if (!user) {
        return null;
      }
      return {
        ...user,
        language: mapPrismaLanguageToLanguage(user.language),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to fetch user`);
    }
  }

  async ensureUser(telegramUserId: number): Promise<UserResponseDto> {
    try {
      const user = await this.prisma.user.upsert({
        where: { telegramId: telegramUserId },
        create: { telegramId: telegramUserId },
        update: {},
      });
      return {
        ...user,
        language: mapPrismaLanguageToLanguage(user.language),
      };
    } catch (error) {
      this.logger.error(`Failed to ensure user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to ensure user`);
    }
  }
}
