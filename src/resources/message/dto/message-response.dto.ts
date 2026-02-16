import { ApiProperty } from "@nestjs/swagger";

export class MessageResponseDto {
  @ApiProperty({
    description: "Content of the message",
    example: "Of course. Tell me what's going on, and we'll think through it together.",
  })
  content: string;
}
