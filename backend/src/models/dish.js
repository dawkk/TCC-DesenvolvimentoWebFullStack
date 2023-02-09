import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  id: {type: String},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required:true}
});

const dishes = mongoose.model('dishes', dishSchema);

export default dishes;