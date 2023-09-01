import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../product-adm/repository/product.model";
import { productRoute } from "../product-adm/infrastructure/api/routes/product.route";
import { clientRoute } from "../client-adm/infrastructure/api/routes/client.route";
import { ClientModel } from "../client-adm/repository/client.model";
import { checkoutRoute } from "../checkout/infrastructure/api/routes/checkout.route";
import { OrderModel } from "../checkout/repository/order.model";
import TransactionModel from "../payment/repository/transaction.model";
import { InvoiceModel } from "../invoice/repository/invoice.model";
import InvoiceItemModel from "../invoice/repository/invoice-item.model";
import { invoiceRoute } from "../invoice/infrastructure/api/routes/invoice.route";


export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);
app.use("/clients", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });
    await sequelize.addModels([ ProductModel, ClientModel, OrderModel, TransactionModel, InvoiceModel, InvoiceItemModel ]);
    await sequelize.sync();
}

setupDb();