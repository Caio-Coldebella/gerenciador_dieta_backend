import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function getMeals(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
}
