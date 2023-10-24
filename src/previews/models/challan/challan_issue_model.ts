import { getServerDate } from "../../components/global/utils";
import { SerialModel } from "../../models/stock/serial_model";
import { StockModel } from "../../models/stock/stock_model";
import { ChallanListModel } from "../../models/challan/challan_model";
import { StockCategory } from "../../models/types";
import { ClientModel } from "../client/client_model";
import { DesignModel } from "../../models/design/design_model";

export class ChallanIssueModel {
  id: number;
  challanId: number;
  serial: SerialModel;
  qty: number;
  issued: boolean;
  date: Date;
  challan?: ChallanListModel;

  constructor(data: {
    id: number;
    challanId: number;
    serial: SerialModel;
    qty: number;
    issued: boolean;
    date: Date;
    challan?: ChallanListModel;
  }) {
    this.id = data.id;
    this.challanId = data.challanId;
    this.serial = data.serial;
    this.qty = data.qty;
    this.issued = data.issued;
    this.date = data.date;
    this.challan = data.challan;
  }

  static fromJSON(map: Record<string, any>): ChallanIssueModel {
    return new ChallanIssueModel({
      id: map["id"],
      challanId: map["challanId"],
      serial: SerialModel.fromJSON(map["serial"]),
      qty: parseFloat(map["qty"].toString()),
      issued: map["issued"],
      date: new Date(map["date"]),
      challan: map["challan"]
        ? ChallanListModel.fromJSON(map["challan"])
        : undefined,
    });
  }
}

export class ChallanIssue {
  qty?: number;
  rate?: number;
  designs: DesignModel[]; // ONLY FOR FORMS
  stock?: StockModel;
  serial?: SerialModel;

  constructor(data: {
    qty?: number;
    rate?: number;
    designs?: DesignModel[];
    stock?: StockModel;
    serial?: SerialModel;
  }) {
    this.qty = data.qty;
    this.rate = data.rate;
    this.designs = data.designs ?? [];
    this.stock = data.stock;
    this.serial = data.serial;
  }
}

export class CreateChallanIssueModel {
  challan?: ChallanListModel;
  issue: ChallanIssue[];
  fromProcess?: StockCategory; // ONLY FOR FORMS
  fromChallans: ChallanListModel[];
  date: Date;
  autoIssue: boolean;

  constructor(data: {
    challan?: ChallanListModel;
    issued: ChallanIssue[];
    fromProcess?: StockCategory;
    fromChallans: ChallanListModel[];
    date: Date;
    autoIssue: boolean;
  }) {
    this.challan = data.challan;
    this.issue = data.issued;
    this.fromProcess = data.fromProcess;
    this.fromChallans = data.fromChallans;
    this.date = data.date;
    this.autoIssue = data.autoIssue;
  }
}

export class CreateChallanIssueWithChallan {
  qty?: number;
  designs: DesignModel[]; // ONLY FOR FORMS
  stock?: StockModel;
  serial?: SerialModel;
  fromChallans?: ChallanListModel[];
  date?: Date;
  rate?: number;

  constructor(data: {
    qty?: number;
    designs?: DesignModel[];
    stock?: StockModel;
    serial?: SerialModel;
    fromChallans?: ChallanListModel[];
    date?: Date;
    rate?: number;
  }) {
    this.qty = data.qty;
    this.designs = data?.designs ?? [];
    this.stock = data.stock;
    this.serial = data.serial;
    this.fromChallans = data.fromChallans;
    this.date = data.date;
    this.rate = data.rate;
  }

  toJSON(): Record<string, string | undefined> {
    if (!this.qty || !this.serial) throw Error("issue-data-required");
    return {
      qty: this.qty.toFixed(2),
      serialId: this.serial.id.toString(),
      date: this.date ? getServerDate(this.date) : undefined,
      rate: this.rate ? this.rate.toString() : undefined,
    };
  }
}

export class BasicChallanIssueModel {
  challanId: number;
  qty: number;
  serialId: number;
  date: Date;

  constructor(data: {
    challanId: number;
    qty: number;
    serialId: number;
    date: Date;
  }) {
    this.challanId = data.challanId;
    this.qty = data.qty;
    this.serialId = data.serialId;
    this.date = data.date;
  }

  static fromJSON(map: Record<string, any>): BasicChallanIssueModel {
    return new BasicChallanIssueModel({
      challanId: map["challanId"],
      serialId: map["serialId"],
      qty: parseFloat(map["qty"].toString()),
      date: new Date(map["date"]),
    });
  }
}

export type IssueQueryParams = {
  cursor?: number;
  search?: string;
  exact?: boolean;
  challans?: ChallanListModel[];
  clients?: ClientModel[];
  serials?: SerialModel[];
  category?: StockCategory[];
  issued?: boolean;
  includeChallan?: boolean;
  aggregatedData?: boolean;
  onlyCount?: boolean;
  take?: number;
};
