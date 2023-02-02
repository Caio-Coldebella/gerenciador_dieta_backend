import { getFood, postFood } from "@/controllers/foods-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { foodsSchema } from "@/schemas";
import { Router } from "express";

const foodsRouter = Router();

foodsRouter
  .all("/*", authenticateToken)
  .get("/:foodname", getFood)
  .get("/api/:foodname", getFood)
  .post("/", validateBody(foodsSchema), postFood);
export { foodsRouter };
