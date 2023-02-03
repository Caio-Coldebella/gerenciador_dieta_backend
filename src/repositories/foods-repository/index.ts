import { prisma } from "@/config";
import { Food } from "@prisma/client";
export type CreateFoodParams = Omit<Food, "id">;

async function insertFood(data: CreateFoodParams) {
  return prisma.food.create({
    data
  });
}

async function findFoodInDatabase(name: string) {
  const nametext = name+"%";
  return prisma.$queryRaw`SELECT * FROM "Food" WHERE "Food".name::text LIKE ${nametext} LIMIT 5;`;
}

const foodsRepositorie = {
  insertFood,
  findFoodInDatabase
};

export default foodsRepositorie;
