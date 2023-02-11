import express from "express";
import session from "express-session";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

/* 
require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') */


db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso")
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
routes(app);

export default app