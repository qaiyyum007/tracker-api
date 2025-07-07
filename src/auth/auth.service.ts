import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    console.log('User:', user);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = loginDto.password === user.password;

    console.log('LoginDto:', loginDto);
    console.log('Password Match:', isPasswordMatch);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
