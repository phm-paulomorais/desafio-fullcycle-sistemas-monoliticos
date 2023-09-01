import ClientRepository from "../../../../client-adm/repository/client.repository";
import AddClientUseCase from "../../../../client-adm/usecase/add-client/add-client.usecase";
import ProductRepository from "../../../../product-adm/repository/product.repository";
import AddProductUseCase from "../../../../product-adm/usecase/add-product/add-product.usecase";
import { app, sequelize } from "../../../../server/express";
import request from "supertest";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should to do a checkout", async () => {
    const clientUsecase = new AddClientUseCase(new ClientRepository());

    
    const inputClient = {
        id: "1c",
        name: "Client 1",
        email: "x@x.com",
        address: "Address 1",
      };

    const resultClient = await clientUsecase.execute(inputClient);

    const pruductUsecase = new AddProductUseCase(new ProductRepository());

    const inputProduct = {
        id: "1",  
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 100,
        stock: 10,
    };
    
    const resultProduct1 = await pruductUsecase.execute(inputProduct);
    
    const inputProduct2 = {
        id: "2",  
        name: "Product 2",
        description: "Product 2 description",
        purchasePrice: 100,
        stock: 10,
    };
    
   const resultProduct2 = await pruductUsecase.execute(inputProduct2);
    

    const response = await request(app)
      .post("/checkout")
      .send( {
        id: resultClient.id,
        products: [inputProduct, inputProduct2]
      });


    expect(response.status).toBe(200);
    expect(response.body.invoiceId).toBe("1");
    expect(response.body.status).toBe("approved");
    expect(response.body.products).toHaveLength(2);
  });


});