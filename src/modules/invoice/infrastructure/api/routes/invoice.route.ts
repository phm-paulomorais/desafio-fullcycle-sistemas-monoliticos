import express, { Request, Response } from "express";
import FindInvoiceUseCase from "../../../usecase/find-invoice/find-invoice.usecase";
import InvoiceRepository from "../../../repository/invoice.repository";

export const invoiceRoute = express.Router();

invoiceRoute.post("/:id", async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository());
  try {
    const fincInvoiceInputDto = {
        id: req.params.id,
    };
    const output = await usecase.execute(fincInvoiceInputDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
