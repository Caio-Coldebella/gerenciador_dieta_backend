import { prisma } from "@/config";
import { Food } from "@prisma/client";
export type CreateFoodParams = Omit<Food, "id">;

async function insertFood(data: CreateFoodParams) {
  return prisma.food.create({
    data
  });
}

async function findFoodInDatabase(name: string) {
  return prisma.food.findFirst({
    where: {
      name
    }
  });
}

/*return prisma.$queryRaw`SELECT "Activities"."startsAt", "Activities"."endsAt" FROM "ActivitySubscription" JOIN "Activities" ON "ActivitySubscription"."activityId" = "Activities"."id"
  WHERE "Activities".date::text LIKE ${datetext} AND "ActivitySubscription"."ticketId"=${ticketId};`;
 */

const foodsRepositorie = {
  insertFood,
  findFoodInDatabase
};

export default foodsRepositorie;
