export default interface IOrder {
  _id: string,
  userId: string,
  deliveryAddress: string,
  cartItems: object,
  totalAmount: number,
  paymentMethod: string,
  status: {
    status: string,
  },
  dateOrdered: Date ,
}

