import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  size: string;

  @ApiProperty()
  price: number;

  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  code: string;
}
