import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ERROR_CODE, ERROR_MESSAGE } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (String(error.code) === ERROR_CODE.USER_ALREADY_EXISTS) {
          throw new ConflictException(
            ERROR_MESSAGE[ERROR_CODE.USER_ALREADY_EXISTS],
          );
        }
      }
      throw error;
    }
  }
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(
      ({ password: _password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (String(error.code) === ERROR_CODE.USER_NOT_FOUND) {
          throw new NotFoundException(ERROR_MESSAGE[ERROR_CODE.USER_NOT_FOUND]);
        }
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = {...updateUserDto};
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await this.prisma.user.update({
      where: { id },
      data: data,
    });

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (String(error.code) === ERROR_CODE.USER_NOT_FOUND) {
          throw new NotFoundException(ERROR_MESSAGE[ERROR_CODE.USER_NOT_FOUND]);
        }
      }
      throw error;
    }
  }
}
