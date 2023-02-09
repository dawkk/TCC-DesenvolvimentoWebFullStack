import express from "express";
import MenuController from "../controllers/menusController.js";

const router = express.Router();

router
  .get("/menus", MenuController.listMenus)
  .get("/menus/:id", MenuController.listMenuById)
  .post("/menus", MenuController.createMenu)
  .put("/menus/:id", MenuController.updateMenu)
  .delete("/menus/:id", MenuController.deleteMenu)


export default router;