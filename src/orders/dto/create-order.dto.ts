import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  productCode: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  size: string;
}
