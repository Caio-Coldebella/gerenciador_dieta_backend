import { getMeals, postMeal } from "@/controllers/meals-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { CreateMealSchema } from "@/schemas/meal-schema";
import { Router } from "express";

const mealsRouter = Router();

mealsRouter
  .all("/*", authenticateToken)
  .get("/", getMeals)
  .post("/", validateBody(CreateMealSchema), postMeal);
export { mealsRouter };
