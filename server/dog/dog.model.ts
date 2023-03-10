import { Prisma, dog } from "@prisma/client";
import { prisma } from "../prisma-client";

 const getDogs = async () => {
  const dogs = await prisma.dog.findMany();
  return dogs;
};

 const getDog = async (dog_id: dog["dog_id"]) => {
  const dog = await prisma.dog.findUnique({
    where: {
      dog_id,
    },
  });
  return dog;
};

 const createDog = async (data: Prisma.dogUncheckedCreateInput) => {
  const dog = await prisma.dog.create({
    data
  });
  return dog;
};

 const updateDog = async (
  dog_id: dog["dog_id"],
  data: Prisma.dogUncheckedUpdateInput
) => {
  const dog = await prisma.dog.update({
    where: {
      dog_id,
    },
    data,
  });
  return dog;
};

 const deleteDog = async (dog_id: dog["dog_id"]) => {
  const dog = await prisma.dog.delete({
    where: {
      dog_id,
    },
  });
  return dog;
};


export const dogModel={
  getDog,
  getDogs,
  createDog,
  updateDog,
  deleteDog
}