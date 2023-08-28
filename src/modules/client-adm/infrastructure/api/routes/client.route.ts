import express, { Request, Response } from "express";
import AddClientUseCase from "../../../usecase/add-client/add-client.usecase";
import ClientRepository from "../../../repository/client.repository";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddClientUseCase(new ClientRepository());
  try {
    const clientDto = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
       
    };
    const output = await usecase.execute(clientDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
