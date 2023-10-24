import {
  ClientModel,
  DesignModel,
  ReturnLineItemModel,
  ReturnPaymentModel,
} from "../../models";
import { BillType, ReturnType } from "../../models/types";

export class ReturnListModel {
  id: number;
  returnNo: string;
  type: ReturnType;
  billId: number;
  client: ClientModel;
  date: Date;
  grandTotal: number;
  netTotal: number;

  constructor(data: {
    id: number;
    returnNo: string;
    type: ReturnType;
    billId: number;
    client: ClientModel;
    date: Date;
    grandTotal: number;
    netTotal: number;
  }) {
    this.id = data.id;
    this.returnNo = data.returnNo;
    this.type = data.type;
    this.billId = data.billId;
    this.client = data.client;
    this.date = data.date;
    this.grandTotal = data.grandTotal;
    this.netTotal = data.netTotal;
  }

  static fromJSON(map: Record<string, any>) {
    return new ReturnListModel({
      id: map["id"],
      returnNo: map["returnNo"],
      type: new ReturnType(map["type"]),
      billId: map["billId"],
      client: ClientModel.fromJSON(map["client"]),
      date: new Date(map["date"]),
      grandTotal: parseFloat(map["grandTotal"].toString()),
      netTotal: parseFloat(map["netTotal"].toString()),
    });
  }
}

export class ReturnModel {
  id: number;
  returnNo: string;
  type: ReturnType;
  billId: number;
  billNo: string;
  billType: BillType;
  billDate: Date;
  challanId: number;
  design?: DesignModel;
  client: ClientModel;
  date: Date;
  total: number;
  cgst: number;
  sgst: number;
  discount: number;
  roundoff: number;
  grandTotal: number;
  netTotal: number;
  reason?: string;
  file?: string;
  lineitems: ReturnLineItemModel[];
  payments: ReturnPaymentModel[];

  constructor(data: {
    id: number;
    returnNo: string;
    type: ReturnType;
    billId: number;
    billNo: string;
    billType: BillType;
    billDate: Date;
    challanId: number;
    design?: DesignModel;
    client: ClientModel;
    date: Date;
    total: number;
    cgst?: number;
    sgst?: number;
    discount?: number;
    roundoff?: number;
    grandTotal: number;
    netTotal: number;
    reason?: string;
    file?: string;
    lineitems?: ReturnLineItemModel[];
    payments?: ReturnPaymentModel[];
  }) {
    this.id = data.id;
    this.returnNo = data.returnNo;
    this.type = data.type;
    this.billId = data.billId;
    this.billNo = data.billNo;
    this.billType = data.billType;
    this.billDate = data.billDate;
    this.challanId = data.challanId;
    this.design = data.design;
    this.client = data.client;
    this.date = data.date;
    this.total = data.total;
    this.cgst = data.cgst || 0.0;
    this.sgst = data.sgst || 0.0;
    this.discount = data.discount || 0.0;
    this.roundoff = data.roundoff || 0.0;
    this.grandTotal = data.grandTotal;
    this.netTotal = data.netTotal;
    this.reason = data.reason;
    this.file = data.file;
    this.lineitems = data.lineitems || [];
    this.payments = data.payments || [];
  }

  static fromJSON(map: { [key: string]: any }): ReturnModel {
    return new ReturnModel({
      id: map["id"],
      returnNo: map["returnNo"],
      type: new ReturnType(map["type"]),
      billId: map["bill"]["id"],
      billNo: map["bill"]["billNo"],
      billType: new BillType(map["bill"]["type"]),
      billDate: new Date(map["bill"]["orderDate"]),
      challanId: map["bill"]["Challan"]["id"],
      design: map["bill"]["Challan"]["design"]
        ? DesignModel.fromJSON(map["bill"]["Challan"]["design"])
        : undefined,
      client: ClientModel.fromJSON(map["client"]),
      date: new Date(map["date"]),
      total: parseFloat(map["total"]),
      discount: parseFloat(map["discount"]),
      cgst: parseFloat(map["cgst"]),
      sgst: parseFloat(map["sgst"]),
      roundoff: parseFloat(map["roundoff"]),
      grandTotal: parseFloat(map["grandTotal"]),
      netTotal: parseFloat(map["netTotal"]),
      file: map["file"],
      reason: map["reason"],
      lineitems: map["ReturnLineItem"]
        ? map["ReturnLineItem"].map((e: any) => ReturnLineItemModel.fromJSON(e))
        : [],
      payments: map["BillPayment"]
        ? map["BillPayment"].map((e: any) => ReturnPaymentModel.fromJSON(e))
        : [],
    });
  }
}

export type ReturnNoteQueryParams = {
  cursor?: number;
  type?: ReturnType;
  netAmountGt?: number;
  netAmountLt?: number;
  client: ClientModel;
  billId?: number;
  startDate?: Date;
  endDAte?: Date;
};
