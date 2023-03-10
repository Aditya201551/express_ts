import express, { Router } from "express";
import { Prisma, owner } from "@prisma/client";
import { ownerModel } from "./owner.model";
import * as uuid from "uuid";
export const ownerRouter: Router = express.Router();

//params, resBody, reqBody, reqQuery, locals
ownerRouter.get<never, owner[]>("/", async (req, res, next) => {
  try {
    const response = await ownerModel.getOwners();
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

ownerRouter.get<{ owner_id: owner["owner_id"] }, owner>(
  "/:owner_id",
  async (req, res, next) => {
    try {
      const { owner_id } = req.params;
      const response = await ownerModel.getOwner(owner_id);
      return res.status(200).send(response);
    } catch (error) {
      //your error handling code
      console.log(error);
      next(error);
    }
  }
);

ownerRouter.get<{
  owner_id: owner["owner_id"];
}>("/:owner_id/dogs", async (req, res, next) => {
  try {
    const { owner_id } = req.params;
    const response = await ownerModel.getOwnerDogs(owner_id);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

ownerRouter.post<
  never,
  owner,
  Omit<Prisma.ownerUncheckedCreateInput, "owner_id">
>("/", async (req, res, next) => {
  try {
    const data = {
      owner_id: uuid.v4(),
      ...req.body,
    };
    const response = await ownerModel.createOwner(data);
    return res.status(201).send(response);
  } catch (error) {
    //your error handling code
    console.log(error.message);
    next(error.message);
  }
});

ownerRouter.put<
  { owner_id: owner["owner_id"] },
  owner,
  Prisma.ownerUncheckedUpdateInput
>("/:owner_id", async (req, res, next) => {
  try {
    const { owner_id } = req.params;
    const data = req.body;
    const response = await ownerModel.updateOwner(owner_id, data);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

ownerRouter.delete<
  {
    owner_id: owner["owner_id"];
  },
  owner
>("/:owner_id", async (req, res, next) => {
  try {
    const { owner_id } = req.params;
    const response = await ownerModel.deleteOwner(owner_id);
    return res.status(200).send(response);
  } catch (error) {
    //your error handling code
    next(error);
    console.log(error);
  }
});
