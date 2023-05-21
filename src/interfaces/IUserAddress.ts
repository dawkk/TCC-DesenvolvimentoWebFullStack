export default interface IUserAddress {
  userId?: string,
  _id?:string,
  city: string,
  state: string,
  neighborhood: string,
  street: string,
  number: number,
  zipcode: string,
  additionalInfo: string,
  mainAddress?: boolean | undefined;
}

