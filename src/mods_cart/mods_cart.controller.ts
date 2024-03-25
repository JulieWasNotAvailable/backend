import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AddModToCartDto } from './dto/addModToCart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './mods_cart.service';
import { UpdateModToCartDto } from './dto/updateModToCart.dto';
// import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(public service: CartService) {}

  @Post('addProductToCart')
  async addProductToCart(@Body() dto: AddModToCartDto, @Req() req) {
    return await this.service.addModToCart(dto, req.user.id);
  }

  @Patch('updateProductFromCart')
  async updateProductFromCart(@Body() dto: UpdateModToCartDto, @Req() req) {
    return await this.service.UpdateProductFromCart(dto, req.id);
  }
}
