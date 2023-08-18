import {
    Table,
    Model,
    PrimaryKey,
    Column,
    HasMany,
  } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";
@Table({
  tableName: "invoices",
  timestamps: false,
})
export class InvoiceModel extends Model {

  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number_address: number;

  @Column({ allowNull: false })
  zip: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  complement: string;

  @HasMany(() => InvoiceItemModel)
  declare items: InvoiceItemModel[];

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
