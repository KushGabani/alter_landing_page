import { ChallanListModel } from "../../models/challan/challan_model";
import { DesignModel } from "../../models/design/design_model";
import { SerialStatus, StockCategory } from "../../models/types";
import { StockModel } from "./stock_model";
import { StocktypeModel } from "./stocktype_model";
import { ClientModel } from "../client/client_model";

export class SerialModel {
  id: number;
  category: StockCategory;
  type?: StocktypeModel;
  stockId: number;
  moveId?: number;
  qty: number;
  file?: String;
  stock?: StockModel;
  inLogs?: InventoryLogModel[];
  outLogs?: InventoryLogModel[];

  constructor(data: {
    id: number;
    category: StockCategory;
    type?: StocktypeModel;
    stockId: number;
    moveId?: number;
    qty: number;
    file?: String;
    stock?: StockModel;
    inLogs?: InventoryLogModel[];
    outLogs?: InventoryLogModel[];
  }) {
    this.id = data.id;
    this.category = data.category;
    this.type = data.type;
    this.stockId = data.stockId;
    this.moveId = data.moveId;
    this.qty = data.qty;
    this.file = data.file;
    this.stock = data.stock;
    this.inLogs = data.inLogs;
    this.outLogs = data.outLogs;
  }

  static fromJSON(map: Record<string, any>): SerialModel {
    return new SerialModel({
      id: map["id"],
      category: new StockCategory(map["category"]),
      type: map["type"] ? StocktypeModel.fromJSON(map["type"]) : undefined,
      stockId: map["stockId"],
      moveId: map["moveId"],
      qty: parseFloat(map["qty"].toString()),
      file: map["file"],
      stock: map["stock"] ? StockModel.fromJSON(map["stock"]) : undefined,
      inLogs: map["InventoryIn"]
        ? map["InventoryIn"].map((e: Record<string, any>) =>
            InventoryLogModel.fromJSON(e)
          )
        : null,
      outLogs: map["InventoryOut"]
        ? map["InventoryOut"].map((e: Record<string, any>) =>
            InventoryLogModel.fromJSON(e)
          )
        : null,
    });
  }
}

export type SerialQueryParams = {
  cursor?: number;
  types?: StocktypeModel[];
  notTypes?: StocktypeModel[];
  category?: StockCategory[];
  notCategory?: StockCategory[];
  designs?: DesignModel[];
  receiveChallans?: ChallanListModel[];
  issueChallans?: ChallanListModel[];
  stocks?: StockModel[];
  receiveClients?: ClientModel[];
  issueClients?: ClientModel[];
  search?: string;
  orderBy?: string;
  qtyGte?: number;
  qtyLte?: number;
  status?: SerialStatus;
  includeStock?: boolean;
  includeInventoryIn?: boolean;
  includeInventoryOut?: boolean;
  aggregatedData?: boolean;
  onlyCount?: boolean;
};

class InventoryLogModel {
  id: number;
  challanId: number;
  serialId: number;
  qty: number;
  date: Date;
  challan?: ChallanListModel;

  constructor(data: {
    id: number;
    challanId: number;
    serialId: number;
    qty: number;
    date: Date;
    challan?: ChallanListModel;
  }) {
    this.id = data.id;
    this.challanId = data.challanId;
    this.serialId = data.serialId;
    this.qty = data.qty;
    this.date = data.date;
    this.challan = data.challan;
  }

  static fromJSON(map: Record<string, any>): InventoryLogModel {
    return new InventoryLogModel({
      id: map["id"],
      challanId: map["challanId"],
      serialId: map["serialId"],
      qty: parseFloat(map["qty"].toString()),
      date: new Date(map["date"]),
      challan: ChallanListModel.fromJSON(map["challan"]),
    });
  }
}
