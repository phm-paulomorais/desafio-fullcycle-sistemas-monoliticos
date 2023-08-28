import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../product-adm/repository/product.model";
import { productRoute } from "../product-adm/infrastructure/api/routes/product.route";
import { clientRoute } from "../client-adm/infrastructure/api/routes/client.route";
import { ClientModel } from "../client-adm/repository/client.model";


export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);
app.use("/clients", clientRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });
    await sequelize.addModels([ ProductModel, ClientModel ]);
    await sequelize.sync();
}

setupDb();