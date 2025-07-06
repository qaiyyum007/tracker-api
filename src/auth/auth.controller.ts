import { UserService } from './../user/user.service';
import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService:UserService) {}


  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    const userId = req.user?.sub;

    if (!userId) {
      throw new UnauthorizedException('User ID not found in token');
    }

    const user = await this.userService.findById(userId);
    return {
      message: 'User profile retrieved',
      user: user,
    };
  }


}
