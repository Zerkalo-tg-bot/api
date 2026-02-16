import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SendMessageDto {
  @ApiProperty({
    description: "Content of the message",
    example: "Hello, I have a problem. Can you help me?",
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
