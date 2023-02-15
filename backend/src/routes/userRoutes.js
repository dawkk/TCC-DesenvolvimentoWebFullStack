import express from "express";
import UserController from "../controllers/userController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const router = express.Router();

/* quando projetar rotas precisamos colocar no topo da mais especifica para a menos especifica, ou teremos erros de código */

router
  .get("/users", UserController.listUsers)
  .get("/users/search", UserController.listUserByEmail)
  .get("/users/:id", UserController.listUserById)
  .post("/users", UserController.createUser)
  .put("/users/:id", UserController.updateUser)
  .delete("/users/:id", UserController.deleteUser)
  .post("/auth/login", UserController.loginUser)
  .get("/auth/logout", verifyJWT, UserController.logoutUser)
  

export default router;