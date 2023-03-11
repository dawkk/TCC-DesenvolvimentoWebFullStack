import ICartItem from "./ICartItem";
import IDish from "./IDish";

export default interface ICartContext {
  cartItems: ICartItem[];
  addToCart: (item: IDish) => void;
  removeFromCart: (item: IDish) => void;
  clearCart: () => void;
}
