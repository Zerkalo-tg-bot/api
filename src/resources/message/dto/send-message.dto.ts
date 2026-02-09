import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SendMessageDto {
  @ApiProperty({ description: "Content of the message" })
  @IsString()
  @IsNotEmpty()
  content: string;
}
