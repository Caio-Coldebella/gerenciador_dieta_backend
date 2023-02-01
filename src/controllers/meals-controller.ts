import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import mealsService from "@/services/meals-service";

export async function getMeals(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const meals = await mealsService.getMeals(Number(userId));
    return res.status(httpStatus.OK).send(meals);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postMeal(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { name } = req.body;
  try {
    await mealsService.postMeal(Number(userId), name);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getFoodinMeal(req: AuthenticatedRequest, res: Response) {
  const { mealId } = req.params;
  try {
    const foods = await mealsService.getFoodsinMeal(Number(mealId));
    return res.status(httpStatus.OK).send(foods);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postFoodinMeal(req: AuthenticatedRequest, res: Response) {
  const { mealId } = req.params;
  const { userId } = req;
  const body = req.body;
  body.mealId = Number(mealId);
  try {
    await mealsService.postFoodinMeal(body);
    await mealsService.updateDietinfo(Number(userId));
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteMealFood(req: AuthenticatedRequest, res: Response) {
  const { mealfoodId } = req.params;
  const { userId } = req;
  try {
    await mealsService.deleteMealfoodbyId(Number(mealfoodId));
    await mealsService.updateDietinfo(Number(userId));
    return res.sendStatus(httpStatus.OK);    
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteMeal(req: AuthenticatedRequest, res: Response) {
  const { mealId } = req.params;
  const { userId } = req;
  try {
    await mealsService.deleteMeal(Number(mealId));
    await mealsService.updateDietinfo(Number(userId));
    return res.sendStatus(httpStatus.OK);    
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
