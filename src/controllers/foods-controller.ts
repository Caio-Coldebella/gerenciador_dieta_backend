import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { CreateFoodParams } from "@/repositories/foods-repository";
import foodsService from "@/services/foods-service";

export async function getFood(req: AuthenticatedRequest, res: Response) {
  const { foodname } = req.params;
  try {
    const food = await foodsService.getFoodInDatabase(foodname.toLowerCase());
    return res.status(httpStatus.OK).send(food);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getFoodInAPI(req: AuthenticatedRequest, res: Response) {
  const { foodname } = req.params;
  try {
    const food = await foodsService.getFoodInDatabase(foodname.toLowerCase());
    if(food.length>0) {
      return res.status(httpStatus.OK).send(food);
    }
    const foodapi = await foodsService.getFoodInAPI(foodname.toLowerCase());
    await foodsService.postFood(foodapi);
    const resp = await foodsService.getFoodInDatabase(foodapi.name);
    return res.status(httpStatus.OK).send(resp);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postFood(req: AuthenticatedRequest, res: Response) {
  const body: CreateFoodParams = req.body;
  body.name = body.name.toLowerCase();
  try {
    await foodsService.postFood(body);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
