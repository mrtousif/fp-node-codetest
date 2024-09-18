import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { FileService } from 'src/file/file.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, FileService, ProductsService],
})
export class OrdersModule {}
