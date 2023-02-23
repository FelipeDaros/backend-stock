import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/craete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAllUsers(companyId: number): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        companyId,
      },
    });

    return users;
  }

  public async create({
    name,
    password,
    email,
    companyId,
  }: CreateUserDto): Promise<Partial<User>> {
    const user = await this.prismaService.user.create({
      data: {
        name,
        password,
        email,
        companyId,
      },
      select: {
        name: true,
        email: true,
        companyId: true,
      },
    });

    return user;
  }

  public async update({
    name,
    password,
    email,
    userId,
  }: UpdateUserDto): Promise<void> {
    if (name) {
      await this.prismaService.user.update({
        data: {
          name,
        },
        where: {
          id: userId,
        },
      });
    }

    if (password) {
      await this.prismaService.user.update({
        data: {
          password,
        },
        where: {
          id: userId,
        },
      });
    }

    if (email) {
      await this.prismaService.user.update({
        data: {
          email,
        },
        where: {
          id: userId,
        },
      });
    }
  }
}
