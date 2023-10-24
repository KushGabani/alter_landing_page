import { PaymentMode, PaymentStatus } from "../../models/types";

export class ReturnPaymentModel {
  id: number;
  billId: number;
  billNo: string;
  billStatus: PaymentStatus;
  date: Date;
  amount: number;
  mode: PaymentMode;
  notes?: string;

  constructor(data: {
    id: number;
    billId: number;
    billNo: string;
    billStatus: PaymentStatus;
    date: Date;
    amount: number;
    mode: PaymentMode;
    notes?: string;
  }) {
    this.id = data.id;
    this.billId = data.billId;
    this.billNo = data.billNo;
    this.billStatus = data.billStatus;
    this.date = data.date;
    this.amount = data.amount;
    this.mode = data.mode;
    this.notes = data.notes;
  }

  static fromJSON(map: Record<string, any>): ReturnPaymentModel {
    return new ReturnPaymentModel({
      id: map["id"],
      billId: map["billId"],
      billNo: map["bill"]["billNo"],
      billStatus: new PaymentStatus(map["bill"]["paymentStatus"]),
      date: new Date(map["date"]),
      amount: parseFloat(map["amount"].toString()),
      mode: new PaymentMode(map["mode"]),
      notes: map["notes"] ?? undefined,
    });
  }
}
