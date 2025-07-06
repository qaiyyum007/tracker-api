import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsMobilePhone,
  IsDateString,
  Validate,
} from 'class-validator';
import { MinAge } from '../min-age.validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsMobilePhone('en-IN', {}, { message: 'Invalid mobile number' })
  mobile: string;

  @IsDateString()
  @Validate(MinAge, [18])
  dob: string;
}
