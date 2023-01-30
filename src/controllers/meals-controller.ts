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
