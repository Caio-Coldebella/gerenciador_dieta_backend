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

async function updateDietinfo(userId: number) {
  const data = await mealsRepository.findMeals(userId);
  const sum = { totalcalories: 0, totalcarb: 0, totalprotein: 0, totalfat: 0 };
  for(let i=0; i<data.length; i++) {
    for(let j=0; j<data[i].Mealfood.length; j++) {
      sum.totalcalories += data[i].Mealfood[j].calories;
      sum.totalcarb += data[i].Mealfood[j].carb;
      sum.totalprotein += data[i].Mealfood[j].protein;
      sum.totalfat += data[i].Mealfood[j].fat;
    }
  }
  return mealsRepository.updateDietinfo(userId, Number(sum.totalcalories), Number(sum.totalcarb), Number(sum.totalprotein), Number(sum.totalfat));
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
  updateDietinfo,
  deleteMealfoodbyId,
  deleteMeal
};

export default mealsService;
