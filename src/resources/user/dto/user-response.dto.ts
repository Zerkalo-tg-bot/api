import { ELanguage } from "@/core";

export class UserResponseDto {
  telegramId: number;
  acceptedDisclaimer: boolean;
  language: ELanguage;
  createdAt: Date;
}
