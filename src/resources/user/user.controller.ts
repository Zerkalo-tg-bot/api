import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateDisclaimerDto } from "./dto/update-disclaimer.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":telegramUserId")
  @ApiOperation({ summary: "Get user information" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID" })
  @ApiResponse({ status: 200, description: "User information retrieved successfully." })
  getUser(@Param("telegramUserId") telegramUserId: string) {
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
  updateDisclaimer(@Param("telegramUserId") telegramUserId: string, @Body() updateDisclaimerDto: UpdateDisclaimerDto) {
    return this.userService.updateUserDisclaimer(+telegramUserId, updateDisclaimerDto);
  }
}
