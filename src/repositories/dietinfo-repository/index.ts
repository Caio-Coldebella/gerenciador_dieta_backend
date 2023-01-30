import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findDietinfo(userId: number) {
  return prisma.dietinfo.findFirst({
    where: {
      userId
    }
  });
}

const dietinfoRepository = {
  findDietinfo
};

export default dietinfoRepository;
