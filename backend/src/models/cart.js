import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {type: String},
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orderItems',
    required:true
}],
  totalValue: {
    type: Number
  }
});

const carts = mongoose.model('carts', cartSchema);

export default carts;