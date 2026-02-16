import { Language } from "@prisma/client";
import { ELanguage } from "../enums";

export function mapLanguageToPrismaLanguage(language: ELanguage): Language {
  switch (language) {
    case ELanguage.ENGLISH:
      return Language.ENGLISH;
    case ELanguage.RUSSIAN:
      return Language.RUSSIAN;
    case ELanguage.POLISH:
      return Language.POLISH;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

export function mapPrismaLanguageToLanguage(language: Language): ELanguage {
  switch (language) {
    case Language.ENGLISH:
      return ELanguage.ENGLISH;
    case Language.RUSSIAN:
      return ELanguage.RUSSIAN;
    case Language.POLISH:
      return ELanguage.POLISH;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}
