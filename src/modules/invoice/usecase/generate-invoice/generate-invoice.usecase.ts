import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

    const auxAddress = new Address(input.street, input.number, input.zipCode, input.city, input.state, input.complement);

    const props = {
        id: new Id(input.id) || new Id(),
        name: input.name,
        document: input.document,
        address: auxAddress,
        items: input.items.map((item) => ( new InvoiceItem( { id: new Id(item.id),  name: item.name, price: item.price})))
    };
    
  
    const invoice = new Invoice(props);
    this._invoiceRepository.generate(invoice);

    const auxItems = invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      }));

    const auxTotal =  invoice.items.map((item) => item.price).reduce((partialSum, a) => partialSum + a, 0); 
    

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zip,
      items: auxItems,
      total: auxTotal
    };
  }
}
