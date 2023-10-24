import { ChallanListModel, StockModel } from "../../models";
import { getServerDate } from "../../components/global/utils";
import { SerialModel } from "./serial_model";
import { StockCategory } from "../../models/types";

export class InventoryLogModel {
  id: number;
  challanId: number;
  serialId: number;
  qty: number;
  date: Date;
  challan?: ChallanListModel;
  serial?: SerialModel;

  constructor(data: {
    id: number;
    challanId: number;
    serialId: number;
    qty: number;
    date: Date;
    challan?: ChallanListModel;
    serial?: SerialModel;
  }) {
    this.id = data.id;
    this.challanId = data.challanId;
    this.serialId = data.serialId;
    this.qty = data.qty;
    this.date = data.date;
    this.challan = data.challan;
    this.serial = data.serial;
  }

  static fromJSON(map: Record<string, any>): InventoryLogModel {
    return new InventoryLogModel({
      id: map["id"],
      challanId: map["challanId"],
      serialId: map["serialId"],
      qty: parseFloat(map["qty"].toString()),
      date: new Date(map["date"]),
      challan: map["challan"]
        ? ChallanListModel.fromJSON(map["challan"])
        : undefined,
      serial: map["serial"] ? SerialModel.fromJSON(map["serial"]) : undefined,
    });
  }
}

export class CreateInventoryLogModel {
  challanId: number;
  qty: number;
  date: Date;
  serial: SerialModel;

  constructor(data: {
    challanId: number;
    qty: number;
    date: Date;
    serial: SerialModel;
  }) {
    this.challanId = data.challanId;
    this.qty = data.qty;
    this.date = data.date;
    this.serial = data.serial;
  }

  toJSON(): Record<string, string> {
    if (!this.serial || !this.qty) throw new Error("issue-stocks-out-required");
    return {
      challanId: this.challanId.toString(),
      qty: this.qty.toFixed(2),
      date: getServerDate(this.date),
      serial: this.serial.id.toString(),
    };
  }
}

export class CreateInventoryLogWithoutChallan {
  qty: number;
  serial: SerialModel;
  date: Date;
  constructor(data: { qty: number; serial: SerialModel; date: Date }) {
    this.qty = data.qty;
    this.serial = data.serial;
    this.date = data.date;
  }
  toJSON(): Record<string, string> {
    return {
      qty: this.qty.toFixed(2),
      serial: this.serial.id.toString(),
      date: getServerDate(this.date),
    };
  }
}

export type LogQueryParams = {
  cursor?: number;
  take?: number;
  challans?: ChallanListModel[];
  serial?: SerialModel;
  stock?: StockModel;
  category?: StockCategory;
  notCategory?: StockCategory;
  type?: StockCategory;
  includeSerial?: boolean;
  includeChallan?: boolean;
  aggregatedData?: boolean;
};
