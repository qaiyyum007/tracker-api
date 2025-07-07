import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'my-super-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard], 
  exports: [AuthService, JwtModule, JwtAuthGuard], 
})
export class AuthModule {}
