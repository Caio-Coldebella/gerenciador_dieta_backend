import { prisma } from "@/config";
import { Mealfood } from "@prisma/client";

export type InsertFoodinMealType = Omit<Mealfood, "id">;

async function findMeals(userId: number) {
  return prisma.meals.findMany({
    where: {
      userId
    }, include: {
      Mealfood: true
    }
  });
}

async function insertMeal(userId: number, name: string) {
  return prisma.meals.create({
    data: {
      userId,
      name
    }
  });
}

async function getFoodsinMeal(mealId: number) {
  return prisma.mealfood.findMany({
    where: {
      mealId
    }
  });
}

async function insertFoodinMeal(data: InsertFoodinMealType) {
  return prisma.mealfood.create({
    data
  });
}

const mealsRepository = {
  findMeals,
  insertMeal,
  getFoodsinMeal,
  insertFoodinMeal
};

export default mealsRepository;
