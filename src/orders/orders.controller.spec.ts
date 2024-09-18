import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { FileService } from '../file/file.service';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';
import { BadRequestException } from '@nestjs/common';

const mockProductData: Product[] = [
  {
    name: 'Cotton T-Shirt',
    code: 'TSH-001',
    variants: [
      {
        size: 'M',
        price: 10,
        quantity: 12,
      },
      {
        size: 'L',
        price: 29.99,
        quantity: 32,
      },
    ],
  },
];

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        ProductsService,
        {
          provide: FileService,
          useValue: {
            readData: jest.fn().mockReturnValue(mockProductData),
            writeData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should return total cost', () => {
    expect(
      controller.checkFulfill([
        {
          productCode: 'TSH-001',
          quantity: 10,
          size: 'M',
        },
      ]),
    ).toMatchObject({ totalCost: 100 });
  });

  it('should return error', async () => {
    try {
      await controller.checkFulfill([
        {
          productCode: 'TSH-001',
          quantity: 1,
          size: 'M',
        },
      ]);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
