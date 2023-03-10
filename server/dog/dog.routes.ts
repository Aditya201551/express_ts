import { Prisma, dog } from "@prisma/client";
import express, { Router } from "express";
import { dogModel } from "./dog.model";
import * as uuid from "uuid";
export const dogRouter: Router = express.Router();

dogRouter.get<never, dog[]>("/", async (req, res, next) => {
  try {
    const response = await dogModel.getDogs();
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

dogRouter.get<
  {
    dog_id: dog["dog_id"];
  },
  dog
>("/:dog_id", async (req, res, next) => {
  try {
    const { dog_id } = req.params;
    const response = await dogModel.getDog(dog_id);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

dogRouter.post<never, dog, Omit<Prisma.dogUncheckedCreateInput, "dog_id">>(
  "/",
  async (req, res, next) => {
    try {
      const data = { dog_id: uuid.v4(), ...req.body };
      const response = await dogModel.createDog(data);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

dogRouter.put<{ dog_id: dog["dog_id"] }, dog, Prisma.dogUncheckedUpdateInput>(
  "/:dog_id",
  async (req, res, next) => {
    try {
      const { dog_id } = req.params;
      const data = req.body;
      const response = await dogModel.updateDog(dog_id, data);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

dogRouter.delete<{ dog_id: dog["dog_id"] }, dog>(
  "/:dog_id",
  async (req, res, next) => {
    try {
      const { dog_id } = req.params;
      const response = await dogModel.deleteDog(dog_id);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);
