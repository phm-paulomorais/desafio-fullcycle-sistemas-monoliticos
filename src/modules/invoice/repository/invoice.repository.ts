import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceItem from "../domain/invoice-item";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";


export default class InvoiceRepository implements InvoiceGateway {
   async generate(entity: Invoice): Promise<void> {
        await InvoiceModel.create(
            {
                id: entity.id.id,
                name: entity.name,
                document: entity.document,
                street: entity.address.street,
                number_address: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
                state: entity.address.state,
                complement: entity.address.complement,
                items: entity.items.map((item) => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                })),
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt
            },
            {
                include: [{ model: InvoiceItemModel }],
            }
        );
    }

    async find(id: string): Promise<Invoice> {
        let invoiceModel;
        try {
          invoiceModel = await InvoiceModel.findOne({
            where: {
              id,
            },
            rejectOnEmpty: true,
            include: ['items'],
          });
        } catch (error) {
          throw new Error('Invoice not found.');
        }

        const auxAddress = new Address(invoiceModel.street, invoiceModel.number_address, invoiceModel.zip, invoiceModel.city, invoiceModel.state, invoiceModel.complement);

        const props = {
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: auxAddress,
            items: invoiceModel.items.map((item) => ( new InvoiceItem( {  name: item.name, price: item.price})))
        };
    
        const invoice = new Invoice(props);
    
        return invoice;
    }
    
}