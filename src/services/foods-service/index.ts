import foodsRepositorie, { CreateFoodParams } from "@/repositories/foods-repository";

async function postFood(body: CreateFoodParams) {
  return foodsRepositorie.insertFood(body);
}

async function getFoodInDatabase(name: string) {
  return foodsRepositorie.findFoodInDatabase(name);
}

const foodsService = {
  postFood,
  getFoodInDatabase
};

export default foodsService;
