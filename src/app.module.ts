import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { FileService } from './file/file.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {}
