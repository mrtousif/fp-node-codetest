import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('check-fulfill')
  @ApiOperation({
    summary: 'Check If order satisfies fulfill the requirement',
  })
  @ApiBody({ type: [CreateOrderDto] })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Order cannot be fulfilled' })
  checkFulfill(@Body() createOrderDto: CreateOrderDto[]) {
    return this.ordersService.checkFulfilOrder(createOrderDto);
  }
}
