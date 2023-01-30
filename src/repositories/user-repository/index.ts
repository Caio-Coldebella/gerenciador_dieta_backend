import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function createDietinfo(userId: number) {
  return prisma.dietinfo.create({
    data: {
      userId: userId,
      totalcalories: 0,
      totalcarb: 0,
      totalprotein: 0,
      totalfat: 0
    }
  });
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  create,
  createDietinfo
};

export default userRepository;
