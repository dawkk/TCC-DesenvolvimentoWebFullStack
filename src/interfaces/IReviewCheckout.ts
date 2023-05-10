
export default interface CheckoutReviewData {
  userId: {
    firstName: string;
    email: string;
  };
  deliveryAddress: {
    city: string;
    state: string;
    neighborhood: string;
    street: string;
    number: string;
    zipcode: string;
    additionalInfo: string;
  };
  paymentMethod: {
    name: string;
  };
}

