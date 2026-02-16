import { ELanguage } from "@/core";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateLanguageDto {
  @IsEnum(ELanguage)
  @IsNotEmpty()
  language: ELanguage;
}
