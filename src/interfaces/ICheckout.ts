export default interface ICheckout {
  userId: string,
  deliveryAddress: string,
  cartItems: object,
  totalPrice: number,
  paymentMethod: string,
}

