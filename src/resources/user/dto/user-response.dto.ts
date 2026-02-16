import { ELanguage } from "@/core";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({ description: "Telegram user ID", example: 123456789 })
  telegramId: number;

  @ApiProperty({ description: "Whether the user accepted the disclaimer", example: false })
  acceptedDisclaimer: boolean;

  @ApiProperty({ description: "User language preference", enum: ELanguage, example: ELanguage.ENGLISH })
  language: ELanguage;

  @ApiProperty({ description: "User creation timestamp", example: "2026-02-16T16:00:00.000Z" })
  createdAt: Date;
}
