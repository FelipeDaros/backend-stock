import { BadRequestException, Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateManyItemDto } from './dto/create-many-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(readonly prismaService: PrismaService) {}

  public async create(createItemDto: CreateItemDto): Promise<Item> {
    const findItem = await this.prismaService.item.findFirst({
      where: {
        name: createItemDto.name,
        companyId: createItemDto.companyId,
      },
    });

    if (findItem)
      throw new BadRequestException('Já existe um produto com esse nome.');

    const item = await this.prismaService.item.create({
      data: createItemDto,
    });

    return item;
  }

  public async createMany(
    createManyItemDto: CreateManyItemDto,
  ): Promise<Item[]> {
    let itemsCreated = [];
    for await (const iterator of createManyItemDto.items) {
      const findItem = await this.prismaService.item.findFirst({
        where: {
          companyId: iterator.companyId,
          name: iterator.name,
        },
      });

      if (findItem)
        throw new BadRequestException('Já existe um produto com esse nome.');

      const item = await this.prismaService.item.create({
        data: iterator,
      });

      itemsCreated.push(item);
    }

    return itemsCreated;
  }

  public async findAll(companyId: number): Promise<Item[]> {
    const items = await this.prismaService.item.findMany({
      where: {
        companyId,
      },
    });

    if (!items)
      throw new BadRequestException(
        'A lista de items está vazia, cadastre um item novo ',
      );

    return items;
  }

  public async findOne(id: number): Promise<Item> {
    const item = await this.prismaService.item.findFirst({
      where: {
        id,
      },
    });

    return item;
  }

  public async update(id: number, updateItemDto: UpdateItemDto): Promise<void> {
    const findItem = await this.prismaService.item.findFirst({
      where: {
        id,
      },
    });

    if (!findItem)
      throw new BadRequestException('Não foi possível localizar o item');

    const itemUpdate: Item = {
      ...findItem,
      name: updateItemDto?.name,
      quantity: updateItemDto?.quantity,
    };

    await this.prismaService.item.update(id, itemUpdate);
  }

  public async remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
