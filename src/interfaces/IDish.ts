export default interface IDish {
  _id: string,
  title: string,
  description: string,
  price: number,
  menu: {
    _id: string,
    name: string,
    statusActive?: boolean,
  },
  image?: string,
  imageURL?: string
}