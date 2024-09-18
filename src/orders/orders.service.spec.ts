import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { FileService } from '../file/file.service';
import { ProductsService } from '../products/products.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, FileService, ProductsService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
