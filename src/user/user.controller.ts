import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Post('register')
@UseInterceptors(
  FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads/profile',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(
          new BadRequestException('Only image files (jpeg, png, jpg, gif) are allowed!'),
          false,
        );
      }
      cb(null, true);
    },
  }),
)
@UsePipes(new ValidationPipe({ transform: true }))
async signup(
  @Body() createUserDto: CreateUserDto,
  @UploadedFile() profileImage: Express.Multer.File,
) {
  const userData = {
    ...createUserDto,
    profileImage: profileImage?.filename,
  };

  const user = await this.userService.createUser(userData);

  return {
    message: 'Signup successful',
    user,
  };
}

 @Get('check-email')
  async checkEmail(@Query('email') email: string): Promise<{ exists: boolean }> {
    const exists = await this.userService.isEmailTaken(email);
    return { exists };
  }


  @Get('all')
async getAllUsers() {
  return this.userService.findAll();
}



}
