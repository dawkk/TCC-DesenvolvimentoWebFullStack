export default interface IUserOrderDetails {
  _id: string;
  userId?: {
    firstName?: string;
    email?: string;
  };
  deliveryAddress?: {
    city?: string;
    state?: string;
    neighborhood?: string;
    street?: string;
    number?: number;
    zipcode?: number;
    additionalInfo?: string;
  };
  paymentMethod?: {
    name?: string;
  };
  cartItems?: Array<{
    _id: string;
    dishId: {
      _id: string;
      title: string;
      price: number;
    };
    quantity: number;
  }>;
  totalAmount?: number;
  status?: {
    status?: string;
  };
  dateOrdered?: Date;
  updatedAt?: Date;
}
