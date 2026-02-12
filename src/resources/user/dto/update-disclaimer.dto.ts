import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdateDisclaimerDto {
  @IsBoolean()
  @IsNotEmpty()
  acceptedDisclaimer: boolean;
}
