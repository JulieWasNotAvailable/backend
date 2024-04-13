import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart } from 'src/mods_cart/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from '../user/user.service';
import { CartItem } from './entities/cart.item.entity';
import { ItemDTO } from './dto/item.dto';
import { KitchensService } from 'src/kitchens/kitchens.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private readonly kitchensService: KitchensService,
    private readonly userService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async createCart(userId: number): Promise<Cart> {
    return this.cartRepository.save({
      userId: userId,
    });
  }

  async findCart(userId: number) {
    return this.cartRepository.findOne({
      relations: {
        cartItems: true,
      },
      where: {
        userId: userId,
      },
    });
  }

  async deleteItem(kitchenId: number, userId: number) {
    try {
      const cartItemId = (await this.findItemInCart(kitchenId, userId)).id;
      return this.cartItemRepository.delete(cartItemId);
    } catch (err) {
      throw new BadRequestException('Продукт не найден');
    }
  }

  async addNewItem(userId, dto: ItemDTO): Promise<CartItem> {
    console.log('inside creating item');
    const product = await this.kitchensService.findOne(dto.kitchenId);
    const cart = await this.findCart(userId);
    return this.cartItemRepository.save({
      quantity: dto.quantity,
      price: product.new_price,
      kitchenId: dto.kitchenId,
      cart: cart,
    });
  }

  async findItemInCart(kitchenId: number, userId: number) {
    return this.cartItemRepository.findOne({
      relations: { cart: true },
      where: {
        cart: {
          userId: userId,
        },
        kitchenId: kitchenId,
      },
    });
  }

  async recountPrice(userId: number) {
    console.log('inside recounting price');
    const cart = await this.findCart(userId);
    if (cart.cartItems.length === 0) {
      return 0;
    }
    let sum = 0;
    cart.cartItems.forEach((item) => (sum += item.price * item.quantity));
    cart.totalPrice = sum;
    return this.cartRepository.save(cart);
  }

  async addNewItemToCart(userId: number, dto: ItemDTO) {
    const cart = await this.findCart(userId);
    //if there is no cart, create cart and add the item
    if (cart == null) {
      await this.createCart(userId);
      await this.addNewItem(userId, dto);
      //if there is a cart, search for the item in it
    } else {
      const item = await this.findItemInCart(dto.kitchenId, userId);
      if (item) {
        //if item exists, change quantity
        if (dto.quantity == 0) {
          //quantity 0 - delete it
          this.deleteItem(dto.kitchenId, userId);
        } else {
          console.log('changing amount');
          item.quantity = dto.quantity;
          this.cartItemRepository.save(item);
        }
      } else {
        //if there is no item, add item
        this.addNewItem(userId, dto);
      }
    }
    //recount price when get
    // await this.recountPrice(userId);
  }
}
