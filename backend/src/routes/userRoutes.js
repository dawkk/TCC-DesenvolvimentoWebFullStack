import express from "express";
import UserController from "../controllers/userController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import verifyRoles from "../middlewares/verifyRoles.js";
import ROLES_LIST from "../config/roles_list.js";
import handleRefreshToken from "../controllers/refreshTokenController.js"

const router = express.Router();

/* quando projetar rotas precisamos colocar no topo da mais especifica para a menos especifica, ou teremos erros de código
https://www.google.com/search?client=firefox-b-d&q=debug+vscode+express */

router.route("/users")
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),  UserController.listAllUsers)
  .post(UserController.createUser)

router.route("/users")
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),  UserController.listAllUsers)
  .post(UserController.createUser)

router.route("/users/:id")
  .get(verifyJWT, verifyRoles(ROLES_LIST.User), UserController.listUserById)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), UserController.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), UserController.deleteUser)

router.route("/users/search")
  .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), UserController.listUserByEmail)

router
  .post("/auth/login", UserController.loginUser)
  .get("/auth/logout", UserController.logoutUser)
  .post("/refresh", handleRefreshToken)


/* 
router
  .get("/users", UserController.listUsers)
  .get("/users/search", UserController.listUserByEmail)
  .get("/users/:id", UserController.listUserById)
  .post("/users", UserController.createUser)
  .put("/users/:id", UserController.updateUser)
  .delete("/users/:id", UserController.deleteUser)
  .post("/auth/login", UserController.loginUser)
  .get("/auth/logout", verifyJWT, UserController.logoutUser)
   */

export default router;