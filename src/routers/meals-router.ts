import { deleteMeal, deleteMealFood, getFoodinMeal, getMeals, postFoodinMeal, postMeal } from "@/controllers/meals-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { CreateFoodinMealSchema, CreateMealSchema } from "@/schemas/meal-schema";
import { Router } from "express";

const mealsRouter = Router();

mealsRouter
  .all("/*", authenticateToken)
  .get("/", getMeals)
  .post("/", validateBody(CreateMealSchema), postMeal)
  .get("/:mealId", getFoodinMeal)
  .post("/:mealId", validateBody(CreateFoodinMealSchema), postFoodinMeal)
  .delete("/:mealId", deleteMeal)
  .delete("/food/:mealfoodId", deleteMealFood);
export { mealsRouter };
