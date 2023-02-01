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

async function updateDietinfo(userId: number, totalcalories: number, totalcarb: number, totalprotein: number, totalfat: number) {
  return prisma.dietinfo.update({
    where: {
      userId
    }, data: {
      totalcalories,
      totalcarb,
      totalprotein,
      totalfat
    }
  });
}

async function deleteMealfoodbyId(id: number) {
  return prisma.mealfood.delete({
    where: {
      id
    }
  });  
}

async function deleteMealfoodbyMealId(mealId: number) {
  return prisma.mealfood.deleteMany({
    where: {
      mealId
    }
  });
}

async function deleteMeal(id: number) {
  return prisma.meals.delete({
    where: {
      id
    }
  });
}

const mealsRepository = {
  findMeals,
  insertMeal,
  getFoodsinMeal,
  insertFoodinMeal,
  updateDietinfo,
  deleteMealfoodbyId,
  deleteMealfoodbyMealId,
  deleteMeal
};

export default mealsRepository;
