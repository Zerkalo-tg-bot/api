import { ELanguage } from "@/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateLanguageDto {
  @ApiProperty({
    description: "User language preference",
    enum: ELanguage,
    example: ELanguage.ENGLISH,
  })
  @IsEnum(ELanguage)
  @IsNotEmpty()
  language: ELanguage;
}
