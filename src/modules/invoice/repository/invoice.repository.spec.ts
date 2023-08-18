import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import Invoice from "../domain/invoice.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceItem from "../domain/invoice-item";
import InvoiceRepository from "./invoice.repository";
import Id from "../../@shared/domain/value-object/id.value-object";


describe("InvoiceRepository test", () => {
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

    it("should add and find a invoice", async () => {
 
        const input = {
            id: new Id("1"),
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

        const auxAddress = new Address(input.street, input.number, input.zipCode, input.city, input.state, input.complement);

        const props = {
            id: input.id,
            name: input.name,
            document: input.document,
            address: auxAddress,
            items: input.items.map((item) => ( new InvoiceItem( { id: new Id(item.id),  name: item.name, price: item.price})))
        };

        const invoice = new Invoice(props);

        const invoiceRepository = new InvoiceRepository();
        
        await invoiceRepository.generate(invoice);

        const invoiceFound = await invoiceRepository.find(invoice.id.id);
        expect(invoiceFound.id).toBeDefined();
        expect(invoiceFound.name).toEqual(input.name);
        expect(invoiceFound.document).toEqual(input.document);
        expect(invoiceFound.address.street).toEqual(input.street);
        expect(invoiceFound.address.number).toEqual(input.number);
        expect(invoiceFound.address.zip).toEqual(input.zipCode);
        expect(invoiceFound.address.city).toEqual(input.city);
        expect(invoiceFound.items.length).toBe(1);
 
      });
    
});