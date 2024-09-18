import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  UpdateOneProductDto,
  UpdateProductDto,
} from './dto/update-product.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all apparel' })
  @ApiResponse({
    status: 200,
    description: 'The found items',
    type: [Product],
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get apparel by code' })
  findOne(@Param('code') code: string) {
    return this.productsService.findOne(code);
  }

  @Patch(':code/:size')
  @ApiOperation({ summary: 'Update one apparel by code and size' })
  @ApiBody({ type: UpdateOneProductDto })
  updateOne(
    @Param('code') code: string,
    @Param('size') size: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    updateProductDto.size = size;
    return this.productsService.updateOne(code, updateProductDto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update many apparel using code and size' })
  @ApiBody({ type: [CreateProductDto] })
  updateMany(@Body() updateProductDto: UpdateProductDto[]) {
    return this.productsService.updateMany(updateProductDto);
  }
}
