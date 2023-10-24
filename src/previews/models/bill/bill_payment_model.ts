import { PaymentMode } from "../../models/types";
import { BillListModel, ReturnListModel } from "../../models";
import { getServerDate } from "../../components/global/utils";

export class BillPaymentModel {
  id: number;
  billId: number;
  billNo?: string;
  date: Date;
  amount: number;
  mode: PaymentMode;
  chequeNo?: string;
  // returnId?: number;
  // returnNote?: ReturnListModel;
  notes?: string;

  constructor(data: {
    id: number;
    billId: number;
    billNo?: string;
    date: Date;
    amount: number;
    mode: PaymentMode;
    chequeNo?: string;
    returnId?: number;
    // returnNote?: ReturnListModel;
    notes?: string;
  }) {
    this.id = data.id;
    this.billId = data.billId;
    this.billNo = data.billNo;
    this.date = data.date;
    this.amount = data.amount;
    this.mode = data.mode;
    this.chequeNo = data.chequeNo;
    // this.returnId = data.returnId;
    // this.returnNote = data.returnNote;
    this.notes = data.notes;
  }

  static fromJSON(map: Record<string, any>) {
    return new BillPaymentModel({
      id: map["id"],
      billId: map["billId"],
      billNo: map["bill"] ? map["bill"]["billNo"] : undefined,
      date: new Date(map["date"]),
      amount: parseFloat(map["amount"]),
      mode: new PaymentMode(map["mode"]),
      chequeNo: map["chequeNo"],
      returnId: map["returnId"],
      // returnNote: map['return']
      //   ? ReturnListModel.fromJSON(map['return'])
      //   : undefined,
      notes: map["notes"] ?? undefined,
    });
  }
}

export class CreateBillPaymentModel {
  bill: BillListModel;
  date: Date;
  amount: number;
  mode: PaymentMode;
  chequeNo?: string;
  returnId?: number;
  notes?: string;

  constructor(data: {
    bill: BillListModel;
    date: Date;
    amount: number;
    mode: PaymentMode;
    chequeNo?: string;
    returnId?: number;
    notes?: string;
  }) {
    this.bill = data.bill;
    this.date = data.date;
    this.amount = data.amount;
    this.mode = data.mode;
    this.chequeNo = data.chequeNo;
    this.returnId = data.returnId;
    this.notes = data.notes;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      billId: this.bill.id.toString(),
      date: getServerDate(this.date),
      amount: this.amount.toFixed(2),
      mode: this.mode.key,
      chequeNo: this.chequeNo,
      returnId: this.returnId?.toString(),
      notes: this.notes,
    };
  }
}

export class CreateBillPaymentWithBill {
  date?: Date;
  amount?: number;
  mode: PaymentMode;
  chequeNo?: string;
  returnId?: number;
  notes?: string;

  constructor(data: {
    date?: Date;
    amount?: number;
    mode: PaymentMode;
    chequeNo?: string;
    returnId?: number;
    notes?: string;
  }) {
    this.date = data.date;
    this.amount = data.amount;
    this.mode = data.mode;
    this.chequeNo = data.chequeNo;
    this.returnId = data.returnId;
    this.notes = data.notes;
  }

  toJSON(): Record<string, string | undefined> {
    if (!this.date || !this.amount) throw new Error("payment-detail-required");

    return {
      date: getServerDate(this.date),
      amount: this.amount.toFixed(2),
      mode: this.mode.key,
      chequeNo: this.chequeNo,
      returnId: this.returnId?.toString(),
      notes: this.notes,
    };
  }
}
