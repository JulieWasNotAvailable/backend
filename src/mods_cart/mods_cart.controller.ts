import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AddModToCartDto } from './dto/addModToCart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './mods_cart.service';
import { UpdateModToCartDto } from './dto/updateModToCart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';

// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(public service: CartService) {}

  // @Roles(['admin, user'])
  @Post('addProductToCart')
  async addProductToCart(@UserId() id: number, @Body() dto: AddModToCartDto) {
    console.log('dto, req: ', dto, id);
    return await this.service.addModToCart(dto, id);
  }

  // @Roles(['admin, user'])
  @Patch('updateProductFromCart')
  async updateProductFromCart(@Body() dto: UpdateModToCartDto, @Req() req) {
    return await this.service.UpdateProductFromCart(dto, req.id);
  }
}
