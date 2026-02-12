import { ApiProperty } from "@nestjs/swagger";

export class BotDisclaimerDto {
  @ApiProperty({ description: "Disclaimer content (HTML)" })
  content: string;
}
