import {
  StockModel,
  BasicChallanInspect,
  ChallanListModel,
  ClientModel,
  DesignModel,
} from "../../models";
import { JobStatus, StockCategory } from "../../models/types";

export class ChallanExpectModel {
  id: number;
  challanId: number;
  qty: number;
  stock: StockModel;
  inspectedQty: number;
  inspects?: BasicChallanInspect[];
  challan?: ChallanListModel;

  constructor(data: {
    id: number;
    challanId: number;
    qty: number;
    stock: StockModel;
    inspectedQty: number;
    inspects?: BasicChallanInspect[];
    challan?: ChallanListModel;
  }) {
    this.id = data.id;
    this.challanId = data.challanId;
    this.qty = data.qty;
    this.stock = data.stock;
    this.inspectedQty = data.inspectedQty;
    this.inspects = data.inspects;
    this.challan = data.challan;
  }

  static fromJSON(map: Record<string, any>) {
    return new ChallanExpectModel({
      id: map["id"],
      challanId: map["challanId"],
      qty: parseFloat(map["qty"].toString()),
      inspectedQty: parseFloat(map["inspectedQty"].toString()),
      stock: StockModel.fromJSON(map["newStock"]),
      inspects: map["ChallanInspection"]
        ? (map["ChallanInspection"] as Array<Record<string, any>>).map((e) =>
            BasicChallanInspect.fromJSON(e)
          )
        : undefined,
      challan: map["challan"]
        ? ChallanListModel.fromJSON(map["challan"])
        : undefined,
    });
  }
}

export class BasicChallanExpect {
  id: number;
  challanId: number;
  qty: number;
  inspectedQty: number;
  stockId: number;

  constructor(data: {
    id: number;
    challanId: number;
    qty: number;
    inspectedQty: number;
    stockId: number;
  }) {
    this.id = data.id;
    this.challanId = data.challanId;
    this.qty = data.qty;
    this.inspectedQty = data.inspectedQty;
    this.stockId = data.stockId;
  }

  static fromJSON(map: Record<string, any>) {
    return new BasicChallanExpect({
      id: map["id"],
      challanId: map["challanId"],
      qty: parseFloat(map["qty"].toString()),
      inspectedQty: parseFloat(map["inspectedQty"].toString()),
      stockId: map["newStockId"],
    });
  }
}

export class CreateChallanExpectModel {
  challanId: number;
  stock: StockModel;
  qty: number;

  constructor(data: { challanId: number; stock: StockModel; qty: number }) {
    this.challanId = data.challanId;
    this.stock = data.stock;
    this.qty = data.qty;
  }

  toJSON = (): Record<string, string> => {
    return {
      challanId: this.challanId.toString(),
      stockId: this.stock.id.toString(),
      qty: this.qty.toString(),
    };
  };
}

export class CreateChallanExpectWithChallan {
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
    this.designs = data?.designs ?? [];
    this.qty = data.qty;
    this.rate = data.rate;
  }

  toJSON = (): Record<string, string> => {
    if (!this.stock || !this.qty) throw new Error();
    return {
      stockId: this.stock.id.toString(),
      qty: this.qty.toString(),
    };
  };
}

export class UpdateChallanExpectModel {
  qty?: number;

  constructor(data: { stock?: StockModel; qty?: number }) {
    this.qty = data.qty;
  }

  toJSON = (): Record<string, string | undefined> => {
    return {
      qty: this.qty?.toString(),
    };
  };
}

export type ExpectQueryParams = {
  cursor?: number;
  search?: string;
  exact?: boolean;
  clients?: ClientModel[];
  category?: StockCategory[];
  stocks?: StockModel[];
  jobStatus?: JobStatus;
  includeChallan?: boolean;
  includeInspection?: boolean;
  challans?: ChallanListModel[];
  aggregatedData?: boolean;
  onlyCount?: boolean;
  take?: number;
};
