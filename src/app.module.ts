import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [UsersModule, CompanyModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
