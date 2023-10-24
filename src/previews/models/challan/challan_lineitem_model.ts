import { ChallanListModel, DesignModel, StockModel } from "../../models";
import { StockCategory } from "../../models/types";

export class ChallanLineItemModel {
  id: number;
  challanId: number;
  stock: StockModel;
  qty: number;
  rate: number;
  payableQty: number;

  constructor(data: {
    id: number;
    challanId: number;
    stock: StockModel;
    qty: number;
    rate: number;
    payableQty: number;
  }) {
    this.id = data.id;
    this.challanId = data.challanId;
    this.stock = data.stock;
    this.qty = data.qty;
    this.rate = data.rate;
    this.payableQty = data.payableQty;
  }

  static fromJSON(map: Record<string, any>): ChallanLineItemModel {
    return new ChallanLineItemModel({
      id: map["id"],
      challanId: map["challanId"],
      stock: StockModel.fromJSON(map["newStock"]),
      qty: parseFloat(map["qty"].toString()),
      rate: parseFloat(map["rate"].toString()),
      payableQty: parseFloat(map["payableQty"].toString()),
    });
  }
}

export class BasicChallanLineItem {
  id: number;
  challanId: number;
  stockId: number;
  qty: number;
  rate: number;
  payableQty: number;

  constructor(data: {
    id: number;
    challanId: number;
    stockId: number;
    qty: number;
    rate: number;
    payableQty: number;
  }) {
    this.id = data.id;
    this.challanId = data.challanId;
    this.stockId = data.stockId;
    this.qty = data.qty;
    this.rate = data.rate;
    this.payableQty = data.payableQty;
  }

  static fromJSON(map: { [key: string]: any }): BasicChallanLineItem {
    return new BasicChallanLineItem({
      id: map["id"] as number,
      challanId: map["challanId"] as number,
      stockId: map["newStockId"] as number,
      qty: parseFloat(map["qty"]),
      rate: parseFloat(map["rate"]),
      payableQty: parseFloat(map["payableQty"]),
    });
  }
}

export class CreateChallanLineItemWithChallan {
  stock?: StockModel;
  qty?: number;
  rate?: number;

  constructor(data: { stock?: StockModel; qty?: number; rate?: number }) {
    this.stock = data.stock;
    this.qty = data.qty;
    this.rate = data.rate;
  }

  toJSON(): Record<string, string> {
    if (!this.stock || !this.qty || !this.rate)
      throw new Error("lineitem-required");
    return {
      stockId: this.stock.id.toString(),
      qty: this.qty.toString(),
      rate: this.rate.toString(),
    };
  }
}

export class ChallanLineItem {
  stock?: StockModel;
  designs: DesignModel[]; // ONLY FOR FORM
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
}

export class CreateChallanLineItemModel {
  challan?: ChallanListModel;
  lineitems: ChallanLineItem[];

  constructor(data: {
    challan?: ChallanListModel;
    lineitems: ChallanLineItem[];
  }) {
    this.challan = data.challan;
    this.lineitems = data.lineitems;
  }
}

export type LineItemQueryParams = {
  challans?: ChallanListModel[];
  mainChallanIds?: number[];
  stocks?: StockModel[];
  challanCategory?: StockCategory;
};
