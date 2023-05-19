import IRoles from "./IRoles"
import IUserAddress from "./IUserAddress"

export default interface IUserDetailed {
  _id?: number,
  firstName: string,
  lastName: string,
  email: string,
  cellphone: string,
  addresses?: IUserAddress[],
  roles?:IRoles,
  createdAt: string
}

