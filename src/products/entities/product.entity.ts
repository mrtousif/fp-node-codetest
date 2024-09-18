import { ApiProperty } from '@nestjs/swagger';
class ProductVariant {
  @ApiProperty()
  size: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}

export class Product {
  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ type: [ProductVariant] })
  variants: ProductVariant[];
}
