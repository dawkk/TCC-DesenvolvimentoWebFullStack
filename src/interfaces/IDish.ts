export default interface IDish {
  _id: string,
  title: string,
  description: string,
  price: number,
  menu: {
    _id: string,
    name: string,
  },
  image?: string,
  imageURL?: string
}