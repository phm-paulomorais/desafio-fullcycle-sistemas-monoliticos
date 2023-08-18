import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";


const invoiceItem = new InvoiceItem( {  name: "Produto 1", price: 15 });
const auxAddress = new Address("Rua Brasil", 100, "040-100", "Floripa", "SC", "nenhum");

const invoice = new Invoice({
    id: new Id("1"),
    name: "Nota Fiscal Test1",
    document: "NF de compra",
    address: auxAddress,
    items: [invoiceItem]
  });

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find Invoice Usecase unit test", () => {
    it("should find an invoice", async () => {
      const repository = MockRepository();
      const usecase = new FindInvoiceUseCase(repository);
  
      const input = {
        id: "1",
      };
  
      const result = await usecase.execute(input);
  
      expect(repository.find).toHaveBeenCalled();
      expect(result.id).toEqual(input.id);
      expect(result.name).toEqual(invoice.name);
      expect(result.document).toEqual(invoice.document);
      expect(result.street).toEqual(invoice.address.street);
      expect(result.number).toEqual(invoice.address.number);
      expect(result.complement).toEqual(invoice.address.complement);
      expect(result.city).toEqual(invoice.address.city);
      expect(result.state).toEqual(invoice.address.state);
      expect(result.zipCode).toEqual(invoice.address.zip);
      expect(result.items.length).toBe(1);
      expect(result.createdAt).toEqual(invoice.createdAt);
      expect(result.updatedAt).toEqual(invoice.updatedAt);
    });
});