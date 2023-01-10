import { Request, Response } from "express";
import { IAddressRequest } from "../interfaces/addresses.interface";
import { createAddressesService } from "../services/addresses/createAddresses.service";

const createAddressesController = async (req: Request, res: Response) => {
  const address: IAddressRequest = req.body;
  const userId = req.user.id;
  const newAddress = await createAddressesService(address, userId);

  return res.status(201).json(newAddress);
};

export { createAddressesController };
