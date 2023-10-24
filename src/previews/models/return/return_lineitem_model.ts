import { StockModel } from "../../models";

export class ReturnLineItemModel {
  id: number;
  returnId: number;
  stock: StockModel;
  qty: number;
  rate: number;

  constructor(data: {
    id: number;
    returnId: number;
    stock: StockModel;
    qty: number;
    rate: number;
  }) {
    this.id = data.id;
    this.returnId = data.returnId;
    this.stock = data.stock;
    this.qty = data.qty;
    this.rate = data.rate;
  }

  static fromJSON(map: Record<string, any>): ReturnLineItemModel {
    return new ReturnLineItemModel({
      id: map["id"],
      returnId: map["returnId"],
      stock: StockModel.fromJSON(map["stock"]),
      qty: parseFloat(map["qty"].toString()),
      rate: parseFloat(map["rate"].toString()),
    });
  }
}

export class CreateReturnLineItemModel {
  stock: StockModel;
  qty: number;
  rate: number;

  constructor(data: { stock: StockModel; qty: number; rate: number }) {
    this.stock = data.stock;
    this.qty = data.qty;
    this.rate = data.rate;
  }

  toJSON(): Record<string, any> {
    return {
      stockId: this.stock.id.toString(),
      qty: this.qty.toFixed(2),
      rate: this.rate.toFixed(2),
    };
  }
}
