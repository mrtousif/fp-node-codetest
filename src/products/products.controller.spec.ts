import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FileService } from '../file/file.service';
import { Product } from './entities/product.entity';

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

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
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

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should update one apparel', () => {
    expect(
      controller.updateOne('TSH-001', 'M', { quantity: 12, price: 12.5 }),
    ).toBe('Stock updated successfully');
  });

  it('should update many apparel', () => {
    expect(
      controller.updateMany([
        {
          quantity: 12,
          price: 26.99,
          code: 'TSH-001',
          size: 'M',
        },
        {
          quantity: 32,
          price: 29.99,
          code: 'TSH-001',
          size: 'L',
        },
      ]),
    ).toBe('Stock updated successfully');
  });
});
