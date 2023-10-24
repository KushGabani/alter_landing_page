import { DesignModel, StockModel } from "../../models";

export class BillLineItemModel {
  id: number;
  billId: number;
  qty: number;
  stock: StockModel;
  rate: number;

  constructor(data: {
    id: number;
    billId: number;
    qty: number;
    stock: StockModel;
    rate: number;
  }) {
    this.id = data.id;
    this.billId = data.billId;
    this.qty = data.qty;
    this.stock = data.stock;
    this.rate = data.rate;
  }

  static fromJSON(map: Record<string, any>) {
    return new BillLineItemModel({
      id: map["id"],
      billId: map["billId"],
      qty: parseFloat(map["qty"].toString()),
      stock: StockModel.fromJSON(map["newStock"]),
      rate: parseFloat(map["rate"].toString()),
    });
  }
}

export class CreateBillLineItemModelWithBill {
  stock?: StockModel;
  designs: DesignModel[]; // ONLY FOR FORMS
  qty?: number;
  rate?: number;

  constructor(data: {
    stock?: StockModel;
    designs?: DesignModel[];
    qty?: number;
    rate?: number;
  }) {
    this.stock = data.stock;
    this.designs = data.designs ?? [];
    this.qty = data.qty;
    this.rate = data.rate;
  }

  toJSON(): Record<string, any> {
    if (!this.stock || !this.qty || !this.rate)
      throw new Error("lineitem-required");
    return {
      qty: this.qty.toFixed(2),
      stockId: this.stock.id,
      rate: this.rate.toFixed(2),
    };
  }
}
