import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 1,
    required: true
},
item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dishes'
}
});

const orderItems = mongoose.model('orderItems', orderItemSchema);

export default orderItems;