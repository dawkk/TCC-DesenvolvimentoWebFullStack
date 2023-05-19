export default interface IUser {
  _id?: number,
  firstName: string,
  lastName: string,
  email: string,
  cellphone: string,
  address?: object,
  createdAt:Date
}

