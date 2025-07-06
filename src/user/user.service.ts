import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}



  async createUser(createUserDto: CreateUserDto): Promise<User> {
  const existing = await this.findByEmail(createUserDto.email);
  if (existing) {
    throw new ConflictException('Email already registered');
  }

  const user = this.userRepository.create({
    ...createUserDto,
    password: createUserDto.password, 
    dob: new Date(createUserDto.dob), 
  });

  return this.userRepository.save(user);
}


  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

   async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  async findAll(): Promise<User[]> {
  return this.userRepository.find();
}

}
