import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {
  @ApiProperty({ description: "Content of the message" })
  content: string;
}
