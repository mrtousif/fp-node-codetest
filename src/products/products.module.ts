import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, FileService],
})
export class ProductsModule {}
