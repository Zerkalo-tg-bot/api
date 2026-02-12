import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsNotEmpty } from "class-validator";

export class UpdateDisclaimerDto {
  @ApiProperty({ description: "Whether the user accepted the disclaimer" })
  @IsBoolean()
  @IsDefined()
  acceptedDisclaimer: boolean;
}
