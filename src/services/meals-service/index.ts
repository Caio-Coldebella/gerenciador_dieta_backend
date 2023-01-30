import dietinfoRepository from "@/repositories/dietinfo-repository";
import mealsRepository from "@/repositories/meals-repository";
import { Meals } from "@prisma/client";

async function getMeals(userId: number) {
  const meals = await mealsRepository.findMeals(userId);
  const infos = await dietinfoRepository.findDietinfo(userId);
  return {
    meals,
    infos
  };
}

async function postMeal(userId: number, name: string) {
  return mealsRepository.insertMeal(userId, name);
}

export type CreateMealParams = Pick<Meals, "name" >;

const mealsService = {
  getMeals,
  postMeal
};

export default mealsService;
