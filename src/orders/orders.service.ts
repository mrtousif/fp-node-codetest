import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product } from 'src/products/entities/product.entity';
import { FileService } from 'src/file/file.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    private fileService: FileService,
    private productsService: ProductsService,
  ) {}

  checkFulfilOrder(orderItems: CreateOrderDto[]) {
    const existingData = this.fileService.readData();

    let totalCost = 0;
    const min = 20;
    let canFulfill = true;

    orderItems.forEach((orderItem) => {
      const { product, variantIndex } = this.productsService.findVariantByCode(
        existingData,
        orderItem.productCode,
        orderItem.size,
      );

      if (product.variants[variantIndex].quantity >= orderItem.quantity) {
        console.log(
          product.variants[variantIndex],
          product.variants[variantIndex].price,
        );
        totalCost += orderItem.quantity * product.variants[variantIndex].price;
      } else {
        canFulfill = false;
      }
    });

    if (!canFulfill) {
      throw new BadRequestException(`Order cannot be fulfilled`);
    }

    if (totalCost < min) {
      throw new BadRequestException(
        `Minimum order value should be ${min}. Order cannot be fulfilled`,
      );
    }

    return { totalCost };
  }
}
