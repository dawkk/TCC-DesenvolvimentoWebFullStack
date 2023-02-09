import express from "express";
import DishController from "../controllers/dishesController.js";

const router = express.Router();

router
  .get("/dishes", DishController.listDishes)
  .get("/dishes/:id", DishController.listDishById)
  .post("/dishes", DishController.createDish)
  .put("/dishes/:id", DishController.updateDish)
  .delete("/dishes/:id", DishController.deleteDish)


export default router;