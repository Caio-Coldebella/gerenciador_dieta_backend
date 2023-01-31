import { CreateFoodParams } from "@/repositories/foods-repository";
import Joi from "joi";

export const foodsSchema = Joi.object<CreateFoodParams>({
  name: Joi.string().min(1).required(),
  calories100g: Joi.number().min(0).required(),
  carb100g: Joi.number().min(0).required(),
  protein100g: Joi.number().min(0).required(),
  fat100g: Joi.number().min(0).required()
});
