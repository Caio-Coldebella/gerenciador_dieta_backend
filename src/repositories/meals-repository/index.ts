import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findMeals(userId: number) {
  return prisma.meals.findMany({
    where: {
      userId
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

const mealsRepository = {
  findMeals,
  insertMeal
};

export default mealsRepository;
