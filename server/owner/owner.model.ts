import { prisma } from "../prisma-client";
import { owner, Prisma } from "@prisma/client";

const getOwners = async () => {
  const owners = await prisma.owner.findMany();
  return owners;
};

const getOwner = async (owner_id: owner["owner_id"]) => {
  const owner = await prisma.owner.findUnique({
    where: {
      owner_id,
    },
  });

  return owner;
};

const getOwnerDogs = async (owner_id: owner["owner_id"]) => {
  const dogs = await prisma.dog.findMany({
    where: {
      owner_dog_mapping: {
        every: {
          owner_id,
        },
      },
    },
  });

  return dogs;
};

const createOwner = async (data: Prisma.ownerUncheckedCreateInput) => {
  const owner = await prisma.owner.create({
    data,
  });

  return owner;
};

const updateOwner = async (
  owner_id: owner["owner_id"],
  data: Prisma.ownerUpdateInput
) => {
  const owner = await prisma.owner.update({
    where: {
      owner_id,
    },
    data,
  });
  return owner;
};

const deleteOwner = async (owner_id: owner["owner_id"]) => {
  const owner = await prisma.owner.delete({
    where: {
      owner_id,
    },
  });

  return owner;
};

export const ownerModel = {
  getOwners,
  getOwner,
  getOwnerDogs,
  createOwner,
  updateOwner,
  deleteOwner,
};
