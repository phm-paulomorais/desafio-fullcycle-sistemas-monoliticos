export interface GenerateInvoiceFacadeInputDto {
    id?: string;
    name: string;
    document: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      price: number;
    }[];
  }
  
export interface FincInvoiceFacadeInputDto {
    id: string;
}

export interface FindInvoiceFacadeOutputDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      price: number;
    }[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

export default interface InvoiceFacadeInterface {
    generate(input: GenerateInvoiceFacadeInputDto): Promise<void>;
    find(input: FincInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}