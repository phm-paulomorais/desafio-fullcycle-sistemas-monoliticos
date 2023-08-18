import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";


describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should generate a invoice", async () => {
        const repository = new InvoiceRepository();
        const generateUseCase = new GenerateInvoiceUseCase(repository);
        const findUseCase = new FindInvoiceUseCase(repository);
        const facade = new InvoiceFacade({
            generateUseCase: generateUseCase,
            findUseCase: findUseCase,
        });

        const input = {
            id: "1",
            name: "Nota Fiscal Test1",
            document: "NF de compra",
            street: "Rua Brasil", 
            number: 100, 
            complement: "nenhum",
            city: "Floripa",
            state: "SC",
            zipCode: "040-100", 
            items: [{
                id: "1",
                name: "Produto 1",
                price: 10           
            }],
        };

        await facade.generate(input);

        const invoice = await facade.find( { id: "1"});

        expect(invoice).toBeDefined();
        expect(invoice.id).toEqual(input.id);
        expect(invoice.name).toEqual(input.name);
        expect(invoice.document).toEqual(input.document);
        expect(invoice.street).toEqual(input.street);
        expect(invoice.number).toEqual(input.number);
        expect(invoice.complement).toEqual(input.complement);
        expect(invoice.city).toEqual(input.city);
        expect(invoice.state).toEqual(input.state);
        expect(invoice.zipCode).toEqual(input.zipCode);
        expect(invoice.items).toBeDefined();
        expect(invoice.createdAt).toBeDefined();
        expect(invoice.updatedAt).toBeDefined();
        

    });

    
    it("should find a invoice", async () => {
        const repository = new InvoiceRepository();
        const findUseCase = new FindInvoiceUseCase(repository);
        const generateUseCase = new GenerateInvoiceUseCase(repository);
        const facade = new InvoiceFacade({
            generateUseCase: generateUseCase,
            findUseCase: findUseCase,
        });

        const input = {
            id: "1",
            name: "Nota Fiscal Test1",
            document: "NF de compra",
            street: "Rua Brasil", 
            number: 100, 
            complement: "nenhum",
            city: "Floripa",
            state: "SC",
            zipCode: "040-100", 
            items: [
                {
                    id: "1",
                    name: "Produto 1",
                    price: 10           
                }
            ]
        };

        await facade.generate(input);

        const invoice = await facade.find({ id: "1"});

        expect(invoice).toBeDefined();
        expect(invoice.id).toEqual(input.id);
        expect(invoice.name).toEqual(input.name);
        expect(invoice.document).toEqual(input.document);
        expect(invoice.street).toEqual(input.street);
        expect(invoice.number).toEqual(input.number);
        expect(invoice.complement).toEqual(input.complement);
        expect(invoice.city).toEqual(input.city);
        expect(invoice.state).toEqual(input.state);
        expect(invoice.zipCode).toEqual(input.zipCode);
        expect(invoice.createdAt).toBeDefined();
        expect(invoice.updatedAt).toBeDefined();

    });

});