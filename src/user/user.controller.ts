import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Role } from 'src/role/role.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../utils/user.decorator';
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
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@User() user: any) {
    return this.userService.getDetailUser(user);
  }
}
