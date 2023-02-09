import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Admin:cqQHPjYiYBNG3zj@lacookeria.4sd0x9y.mongodb.net/?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;