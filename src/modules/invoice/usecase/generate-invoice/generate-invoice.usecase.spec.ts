import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
      generate: jest.fn(),
      find: jest.fn(),
    };
  };


  describe("Generate Invoice Usecase unit test", () => {
    it("should genarate an invoice", async () => {
      const repository = MockRepository();
      const usecase = new GenerateInvoiceUseCase(repository);

      const input = {
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
  
      const result = await usecase.execute(input);
  
      expect(repository.generate).toHaveBeenCalled();
      expect(result.id).toBeDefined();
      expect(result.name).toEqual(input.name);
      expect(result.document).toEqual(input.document);
      expect(result.street).toEqual(input.street);
      expect(result.number).toEqual(input.number);
      expect(result.zipCode).toEqual(input.zipCode);
      expect(result.city).toEqual(input.city);
      expect(result.items.length).toBe(1);
    });
  });