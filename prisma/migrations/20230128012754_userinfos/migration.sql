-- CreateEnum
CREATE TYPE "Goals" AS ENUM ('LOSE_WEIGHT_FAST', 'LOSE_WEIGHT', 'MAINTAIN', 'GAIN_WEIGHT', 'GAIN_WEIGHT_FAST');

-- CreateTable
CREATE TABLE "Meals" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mealfood" (
    "id" SERIAL NOT NULL,
    "mealId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Mealfood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "calories100g" DOUBLE PRECISION NOT NULL,
    "carb100g" DOUBLE PRECISION NOT NULL,
    "protein100g" DOUBLE PRECISION NOT NULL,
    "fat100g" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Userinfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "goal" "Goals" NOT NULL,

    CONSTRAINT "Userinfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mealfood" ADD CONSTRAINT "Mealfood_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
