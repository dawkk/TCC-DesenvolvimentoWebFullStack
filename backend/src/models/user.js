import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {type: Number},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password:{type: String},
  /* address: {type: mongoose.Schema.Types.ObjectId, ref:'adresses', required: true}, */
  status: {type: Boolean}
});

const users = mongoose.model('users', userSchema);

export default users;