import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {type: String, required: true}
  }
  /* {
    exemplo para lembrar de como tirar version key do array de dados
    versionKey:false
  } */
);

const menus = mongoose.model('menus', menuSchema)

export default menus;