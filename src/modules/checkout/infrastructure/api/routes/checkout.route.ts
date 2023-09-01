import express, { Request, Response } from "express";

import ClientAdmFacadeFactory from "../../../../client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../../store-catalog/factory/facade.factory";
import PaymentFacadeFactory from "../../../../payment/factory/payment.facade.factory";
import InvoiceFacadeFactory from "../../../../invoice/factory/invoice.facade.factory";
import { OrderRepository } from "../../../repository/order.repository";
import { PlaceOrderInputDto } from "../../../usecases/place-order/place-order.dto";
import { Product } from "../../../domain/product.entity";
import { PlaceOrderUseCase } from "../../../usecases/place-order/place-order.usecase";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {

    const facadeClient = ClientAdmFacadeFactory.create();
    const facadeProduct = ProductAdmFacadeFactory.create();
    const facadeCatalog = StoreCatalogFacadeFactory.create();
    const paymentCatalog = PaymentFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const orderRepository = new OrderRepository();
    
    const usecase = new PlaceOrderUseCase(facadeClient, facadeProduct, facadeCatalog, paymentCatalog, invoiceFacade, orderRepository);
    try {

        const input: PlaceOrderInputDto = {
            clientId: req.body.id,
            products: req.body.products.map((p : Product) => ({ productId: p.id })) 
        };

        const output = await usecase.execute(input);
        res.send(output);
    } catch (err) {
        console.log("ERRO 500", err)
        res.status(500).send(err);
    }
});
