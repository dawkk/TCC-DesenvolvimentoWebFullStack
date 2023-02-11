import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@lacookeria.4sd0x9y.mongodb.net/?retryWrites=true&w=majority`);

let db = mongoose.connection;

export default db;