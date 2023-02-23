import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}
  public async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.prismaService.company.create({
      data: createCompanyDto,
    });

    return company;
  }

  public async findAll() {
    return await this.prismaService.company.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
