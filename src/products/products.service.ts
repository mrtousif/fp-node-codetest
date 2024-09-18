import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FileService } from 'src/file/file.service';

@Injectable()
export class ProductsService {
  constructor(private fileService: FileService) {}

  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  findAll() {
    return this.fileService.readData();
  }

  findOne(code: string) {
    const existingData = this.fileService.readData();

    return existingData.find((item) => item.code === code);
  }

  updateOne(code: string, updateProductDto: UpdateProductDto) {
    const { size, quantity, price } = updateProductDto;
    const existingData = this.fileService.readData();

    const { variantIndex, product } = this.findVariantByCode(
      existingData,
      code,
      size,
    );
    let updated = false;
    if (variantIndex > -1) {
      updated = this.updateVariant(existingData, code, {
        ...product.variants[variantIndex],
        size,
        quantity,
        price,
      });
    } else {
      throw new NotFoundException('Product not found');
    }
    if (updated) {
      return `Stock updated successfully`;
    }
    return `Stock failed to update`;
  }

  updateMany(updateProductDto: UpdateProductDto[]) {
    const newData = updateProductDto;
    const existingData = this.fileService.readData();

    newData.forEach((newItem) => {
      const { variantIndex, product } = this.findVariantByCode(
        existingData,
        newItem.code,
        newItem.size,
      );
      if (variantIndex > -1) {
        this.updateVariant(existingData, newItem.code, {
          ...product.variants[variantIndex],
          price: newItem.price,
          quantity: newItem.quantity,
        });
      } else {
        throw new NotFoundException(`Product ${newItem.code} not found`);
      }
    });

    return 'Stock updated successfully';
  }

  findVariantByCode(products: Product[], code: string, size: string) {
    for (const product of products) {
      const variantIndex = this.findVariantIndexInProduct(product, code, size);
      if (variantIndex !== -1) {
        return { product, variantIndex };
      }
    }

    return null;
  }

  findVariantIndexInProduct(product: Product, code: string, size: string) {
    for (let i = 0; i < product.variants.length; i++) {
      const variant = product.variants[i];
      if (product.code === code && variant.size === size) {
        return i;
      }
    }

    return -1;
  }

  updateVariant(products: Product[], code: string, updatedVariant) {
    const { product, variantIndex } = this.findVariantByCode(
      products,
      code,
      updatedVariant.size,
    );

    if (product && variantIndex !== -1) {
      if (updatedVariant.price) {
        product.variants[variantIndex].price = updatedVariant.price;
      }
      if (updatedVariant.quantity) {
        product.variants[variantIndex].quantity = updatedVariant.quantity;
      }

      console.log(product.variants[variantIndex]);

      products = products.map((p) => {
        if (product.code === p.code) {
          return product;
        }

        return p;
      });

      this.fileService.writeData(products);
      return true;
    } else {
      return false;
    }
  }
}
