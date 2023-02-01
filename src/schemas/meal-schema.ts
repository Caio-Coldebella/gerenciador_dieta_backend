import { InsertFoodinMealType } from "@/repositories/meals-repository";
import { CreateMealParams } from "@/services/meals-service";
import Joi from "joi";

export const CreateMealSchema = Joi.object<CreateMealParams>({
  name: Joi.string().min(1).required()
});

type InsertFoodinMealSchemaType = Omit<InsertFoodinMealType, "mealId" >;

export const CreateFoodinMealSchema = Joi.object<InsertFoodinMealSchemaType>({
  name: Joi.string().min(1).required(),
  quantity: Joi.number().min(0).required(),
  calories: Joi.number().min(0).required(),
  carb: Joi.number().min(0).required(),
  protein: Joi.number().min(0).required(),
  fat: Joi.number().min(0).required()
});
