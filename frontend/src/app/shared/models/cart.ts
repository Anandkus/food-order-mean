import { CartItem } from './cartItem';

export class Cart {
  items: CartItem[] = [];

  get totalPrice(): number {
    let totalprice = 0;
    this.items.forEach((item) => {
      totalprice += item.price;
    });
    return totalprice;
  }
}
