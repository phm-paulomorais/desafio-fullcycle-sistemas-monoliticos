import InvoiceGateway from "../../gateway/invoice.gateway";
import { FincInvoiceInputDto, FindInvoiceOutputDto } from "./find-invoice.usecase.dto";


export default class FindInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: FincInvoiceInputDto): Promise<FindInvoiceOutputDto> {
    const invoice = await this._invoiceRepository.find(input.id);

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
      items: invoice.items.map((item) => ({ id: item.id.id, name: item.name, price: item.price})),
      total:  invoice.items.map((item) => item.price).reduce((partialSum, a) => partialSum + a, 0),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }
}
