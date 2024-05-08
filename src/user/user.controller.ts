import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Role } from 'src/role/role.decorator';
import { RolesGuard } from '../role/roles.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
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

  // @Role('user')
  @Get('')
  @HttpCode(HttpStatus.OK)
  getProfile(@User() user: any) {
    return this.userService.getDetailUser(user);
  }

  @Put('')
  @HttpCode(HttpStatus.OK)
  updateProfile(@User('_id') userId: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(userId, body);
  }
}
