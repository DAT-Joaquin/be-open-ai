import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { Role } from 'src/role/role.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../role/roles.guard';
import { User } from '../utils/user.decorator';
import { UpdateUserDto } from './dto/index.dto';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Lấy thông tin cá nhân của người dùng',
  })
  // @Role('user')
  @Get('')
  @HttpCode(HttpStatus.OK)
  getProfile(@User() user: any) {
    return this.userService.getDetailUser(user);
  }

  @ApiOperation({
    summary: 'Cập nhật thông tin cá nhân của người dùng',
  })
  @Put('')
  @HttpCode(HttpStatus.OK)
  updateProfile(@User('_id') userId: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(userId, body);
  }
}
