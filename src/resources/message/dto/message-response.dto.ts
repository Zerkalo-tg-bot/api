import { ApiProperty } from "@nestjs/swagger";

export class MessageResponseDto {
  @ApiProperty({ description: "Content of the message" })
  content: string;
}
