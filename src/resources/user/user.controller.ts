import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateDisclaimerDto } from "./dto/update-disclaimer.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { ELanguage } from "@/core";
import { UserResponseDto } from "./dto/user-response.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":telegramUserId")
  @ApiOperation({ summary: "Get user information" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID" })
  @ApiResponse({ status: 200, description: "User information retrieved successfully." })
  getUser(@Param("telegramUserId") telegramUserId: string): Promise<UserResponseDto> {
    return this.userService.getUser(+telegramUserId);
  }

  @Patch(":telegramUserId/disclaimer")
  @ApiOperation({ summary: "Update user disclaimer acceptance" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID" })
  @ApiBody({
    type: UpdateDisclaimerDto,
    description: "Disclaimer update payload",
  })
  @ApiResponse({ status: 200, description: "User disclaimer updated successfully." })
  updateDisclaimer(
    @Param("telegramUserId") telegramUserId: string,
    @Body() updateDisclaimerDto: UpdateDisclaimerDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUserDisclaimer(+telegramUserId, updateDisclaimerDto);
  }

  @Patch(":telegramUserId/language")
  @ApiOperation({ summary: "Update user language preference" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        language: { type: "string", enum: Object.values(ELanguage) },
      },
    },
  })
  @ApiResponse({ status: 200, description: "User language updated successfully." })
  updateLanguage(
    @Param("telegramUserId") telegramUserId: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUserLanguage(+telegramUserId, updateLanguageDto);
  }
}
