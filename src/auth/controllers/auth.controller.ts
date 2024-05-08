import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/index.dto';
import { UserService } from '../../user/user.service';
import { User } from '../../utils/user.decorator';
import {
  CreateNewPasswordDto,
  ForgetPasswordDto,
  GenerateNewTokenDto,
  GetAgainVerifyUser,
  LoginUserDto,
  RegisterResponse,
} from '../dto/index.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOkResponse({ type: RegisterResponse })
  @ApiOperation({
    summary:
      'Đăng ký người dùng mới. Sẽ bắn một email chứa đường link xác thực chứa token trong email của người dùng sau khi gọi api này thành công',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @ApiOperation({
    summary:
      'Đăng nhập vào hệ thống. Api sẽ trả ra token và refresh token cho người dùng',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@User() user: CreateUserDto, @Body() loginUser: LoginUserDto) {
    return this.authService.login(user);
  }

  @ApiOperation({
    summary: 'Xác thực token của người dùng đăng ký mới.',
  })
  @Get('verify/:token')
  @HttpCode(HttpStatus.OK)
  async verifyUser(@Param('token') token: string) {
    return this.authService.verifyUser(token);
  }

  @ApiOperation({
    summary:
      'Lấy lại token xác thực cho người dùng đã đăng ký do token cũ bị hết hạn',
  })
  @Get('get-again-verify-user')
  @HttpCode(HttpStatus.OK)
  async getAgainVerifyUser(@Query() query: GetAgainVerifyUser) {
    return this.authService.getAgainVerifyUser(query);
  }

  @ApiOperation({
    summary:
      'Quên mật khẩu. Sau khi api chạy thành công, sẽ bắn một email chứa token để xác thực lần đổi mật khẩu của người dùng',
  })
  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  async forgetPassword(@Body() body: ForgetPasswordDto) {
    return this.authService.forgetPassword(body);
  }

  @ApiOperation({
    summary:
      'Đổi mật khẩu. Gửi lên cho backend token xác thực và mật khẩu mới để tiến hành đổi mật khẩu.',
  })
  @Post('create-new-password')
  @HttpCode(HttpStatus.OK)
  async createNewPassword(@Body() body: CreateNewPasswordDto) {
    return this.authService.createNewPassword(body);
  }
  @ApiOperation({
    summary:
      'Tạo lại token mới và refresh token mới sau khi refresh token cũ hết hạn',
  })
  @Post('generate-new-token')
  @HttpCode(HttpStatus.CREATED)
  async generateNewToken(@Body() body: GenerateNewTokenDto) {
    return this.authService.generateNewToken(body);
  }
}
