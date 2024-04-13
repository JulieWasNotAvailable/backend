import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './mods_cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateCartDto } from './dto/create-cart.dto';
import { ItemDTO } from './dto/item.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(public service: CartService) {}

  @Roles(['admin', 'user'])
  @Post('createNewCart')
  async createCart(@Request() req) {
    const userId = req.user.id;
    console.log('userId: ', req.user);
    return await this.service.createCart(userId);
  }

  @Roles(['admin', 'user'])
  @Post('addItemToCart')
  async addNewItemToCart(@Request() req, @Body() dto: ItemDTO) {
    const userId = req.user.id;
    return this.service.addNewItemToCart(userId, dto);
  }

  @Roles(['admin', 'user'])
  @Get('getmyCart')
  async findMyCart(@Request() req) {
    const userId = req.user.id;
    return this.service.findCart(userId);
  }

  @Roles(['admin', 'user'])
  @Get('findItemInCart')
  async findItemInCart(@Request() req, @Body() dto: ItemDTO) {
    const userId = req.user.id;
    const kitchenId = dto.kitchenId;
    return this.service.findItemInCart(kitchenId, userId);
  }

  @Roles(['admin', 'user'])
  @Delete('deleteItemByProductId')
  async deleteItem(@Request() req, @Body() dto: ItemDTO) {
    return this.service.deleteItem(dto.kitchenId, +req.user.id);
  }

  @Roles(['admin', 'user'])
  @Get('recountPrice')
  async recount(@Request() req) {
    const userId = req.user.id;
    return this.service.recountPrice(userId);
  }
}
