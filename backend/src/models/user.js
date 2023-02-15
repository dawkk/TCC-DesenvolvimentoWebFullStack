import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {type: Number},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password:{type: String, required: true},
  /* address: {type: mongoose.Schema.Types.ObjectId, ref:'adresses', required: true}, */
  roles: {
    User: {
      type:Number,
      default:4000
    },
    Editor: {type: Number},
    Admin: { type: Number}
  },
  refreshToken: {type: String},
  status: {type: Boolean}
});

const users = mongoose.model('users', userSchema);

export default users;