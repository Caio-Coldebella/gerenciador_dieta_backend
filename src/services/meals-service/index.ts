import dietinfoRepository from "@/repositories/dietinfo-repository";
import mealsRepository, { InsertFoodinMealType } from "@/repositories/meals-repository";
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

async function getFoodsinMeal(mealId: number) {
  return mealsRepository.getFoodsinMeal(mealId);
}

async function postFoodinMeal(data: InsertFoodinMealType) {
  return mealsRepository.insertFoodinMeal(data);
}

async function deleteMealfoodbyId(id: number) {
  return mealsRepository.deleteMealfoodbyId(id);
}

async function deleteMeal(id: number) {
  await mealsRepository.deleteMealfoodbyMealId(id);
  return mealsRepository.deleteMeal(id);
}

export type CreateMealParams = Pick<Meals, "name" >;

const mealsService = {
  getMeals,
  postMeal,
  getFoodsinMeal,
  postFoodinMeal,
  deleteMealfoodbyId,
  deleteMeal
};

export default mealsService;
