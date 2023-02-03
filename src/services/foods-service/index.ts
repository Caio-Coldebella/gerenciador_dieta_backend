import foodsRepositorie, { CreateFoodParams } from "@/repositories/foods-repository";
import { loadEnv } from "@/config";
import axios from "axios";

loadEnv();

async function postFood(body: CreateFoodParams) {
  return foodsRepositorie.insertFood(body);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getFoodInDatabase(name: string): Promise<any> {
  return foodsRepositorie.findFoodInDatabase(name);
}

async function getFoodInAPI(name: string): Promise<CreateFoodParams> {
  const data = await axios.get(process.env.API_LINK+name);
  if(data && data.data) {
    const weight = Number(data.data.totalWeight);
    const obj = {  
      name: name,
      calories100g: Number(((Number(data.data.totalNutrients.ENERC_KCAL.quantity) / weight)*100).toFixed(2)),
      carb100g: Number(((Number(data.data.totalNutrients.CHOCDF.quantity) / weight)*100).toFixed(2)),
      protein100g: Number(((Number(data.data.totalNutrients.PROCNT.quantity) / weight)*100).toFixed(2)),
      fat100g: Number(((Number(data.data.totalNutrients.FAT.quantity) / weight)*100).toFixed(2))
    };
    if(obj.calories100g<=0.1&&obj.carb100g<=0.1&&obj.protein100g<=0.1&&obj.protein100g<=0.1) {
      return null;
    }
    return obj;
  }
  return null;
}

const foodsService = {
  postFood,
  getFoodInDatabase,
  getFoodInAPI
};

export default foodsService;
