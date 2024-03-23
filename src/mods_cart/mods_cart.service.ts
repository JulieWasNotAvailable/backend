import { Injectable } from '@nestjs/common';
import { Cart } from 'src/mods_cart/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Equal, Repository } from 'typeorm';
import { UsersService } from '../user/user.service';
import { ModsService } from 'src/mods/mods.service';
import { AddModToCartDto } from './dto/addModToCart.dto';
import { CartItem } from './entities/cart.item.entity';
import { UpdateModToCartDto } from './dto/updateModToCart.dto';

@Injectable()
export class CartService {
  private readonly cartItemRepository: Repository<CartItem>;

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly modService: ModsService,
    private readonly userService: UsersService,
    private readonly dataSource: DataSource,
  ) {
    this.cartItemRepository = this.dataSource.getRepository(CartItem);
    this.cartRepository = this.dataSource.getRepository(Cart);
  }

  async addModToCart(dto: AddModToCartDto, userId: number) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        cartItems: {
          mod: true,
        },
      },
      where: {
        user: Equal(await this.userService.findById(userId)),
      },
    });
    //If cart is null create new cart for user
    if (userCart == null) {
      const cart = this.cartRepository.create({
        user: await this.userService.findById(userId),
      });
      await this.cartRepository.save(cart);
      const cartItem = this.cartItemRepository.create({
        mod: await this.modService.findOne(dto.modId),
        Quantity: dto.quantity,
        cart: cart,
      });
      await this.cartItemRepository.save(cartItem);
    }
    const mod = await this.modService.findOne(dto.modId);
    userCart.cartItems.forEach((x) => x.mod.id); //don't know wtf does it do, but i changed name to id, cuz i don't have name property on mod

    //If same product already exists in cart increment count.
    if (userCart.cartItems.some((x) => x.mod.id == mod.id)) {
      const cItem = userCart.cartItems.find((x) => x.mod.id == mod.id);
      cItem.Quantity += dto.quantity;
      return await this.cartItemRepository.save(cItem);
    }

    const cartItem = await this.cartItemRepository.create({
      mod: mod,
      Quantity: dto.quantity,
    });
    cartItem.cart = userCart;
    return await this.cartItemRepository.save(cartItem);
  }

  async UpdateProductFromCart(dto: UpdateModToCartDto, userId: number) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        cartItems: {
          mod: true,
        },
      },
      where: {
        user: Equal(await this.userService.findById(userId)),
      },
    });
    const cartItem = await this.cartItemRepository.findOne({
      relations: {
        cart: true,
        mod: true,
      },
      where: {
        mod: Equal(await this.modService.findOne(dto.modId)),
        cart: Equal(userCart),
      },
    });
    cartItem.Quantity = dto.quantity;
    //If quantity equals zero delete item from cart
    if (cartItem.Quantity == 0) {
      return await this.cartItemRepository.remove(cartItem);
    }
    return await this.cartItemRepository.save(cartItem);
  }
}
