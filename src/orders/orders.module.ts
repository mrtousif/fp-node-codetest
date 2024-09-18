import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { FileService } from '../file/file.service';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, FileService, ProductsService],
})
export class OrdersModule {}
