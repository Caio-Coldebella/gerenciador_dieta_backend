import { CreateMealParams } from "@/services/meals-service";
import Joi from "joi";

export const CreateMealSchema = Joi.object<CreateMealParams>({
  name: Joi.string().min(1).required()
});
