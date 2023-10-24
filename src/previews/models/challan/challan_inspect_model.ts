import { InspectionStatus, SerialStatus } from "../../models/types";
import {
  ChallanExpectModel,
  ChallanListModel,
  ChallanModel,
} from "../../models";
import { SerialModel } from "../../models/stock/serial_model";

export class ChallanInspectModel {
  id: number;
  challan?: ChallanListModel;
  challanId: number;
  expected: ChallanExpectModel;
  serial: SerialModel;
  qty: number;
  date: Date;
  status: InspectionStatus;
  notes?: string;

  constructor(data: {
    id: number;
    challan?: ChallanListModel;
    challanId: number;
    expected: ChallanExpectModel;
    serial: SerialModel;
    qty: number;
    date: Date;
    status: InspectionStatus;
    notes?: string;
  }) {
    this.id = data.id;
    this.challan = data.challan;
    this.challanId = data.challanId;
    this.expected = data.expected;
    this.serial = data.serial;
    this.qty = data.qty;
    this.date = data.date;
    this.status = data.status;
    this.notes = data.notes;
  }

  static fromJSON(map: Record<string, any>) {
    return new ChallanInspectModel({
      id: map["id"],
      challan: map["challan"]
        ? ChallanListModel.fromJSON(map["challan"])
        : undefined,
      challanId: map["challanId"],
      expected: ChallanExpectModel.fromJSON(map["expectation"]),
      serial: SerialModel.fromJSON(map["serial"]),
      qty: parseFloat(map["qty"].toString()),
      date: map["date"],
      status: new InspectionStatus(map["status"]),
      notes: map["notes"] ?? undefined,
    });
  }
}

export class BasicChallanInspect {
  id: number;
  challanId: number;
  expectationId: number;
  serialId: number;
  serial?: SerialModel;
  qty: number;
  date: Date;
  status: InspectionStatus;
  notes?: string;

  constructor(data: {
    id: number;
    challanId: number;
    expectationId: number;
    serialId: number;
    serial?: SerialModel;
    qty: number;
    date: Date;
    status: InspectionStatus;
    notes?: string;
  }) {
    this.id = data.id;
    this.challanId = data.challanId;
    this.expectationId = data.expectationId;
    this.serialId = data.serialId;
    this.serial = data.serial;
    this.qty = data.qty;
    this.date = data.date;
    this.status = data.status;
    this.notes = data.notes;
  }

  static fromJSON(map: Record<string, any>) {
    return new BasicChallanInspect({
      id: map["id"],
      challanId: map["challanId"],
      expectationId: map["expectationId"],
      serialId: map["serialId"],
      serial: map["serial"] ? SerialModel.fromJSON(map["serial"]) : undefined,
      qty: parseFloat(map["qty"].toString()),
      date: map["date"],
      status: new InspectionStatus(map["status"]),
      notes: map["notes"] ?? undefined,
    });
  }
}

export class CreateInspectItem {
  expect?: ChallanExpectModel;
  rf?: number;
  ok?: number;
  short?: number;
  date: Date;

  constructor(data: {
    expect?: ChallanExpectModel;
    rf?: number;
    ok?: number;
    short?: number;
    date: Date;
  }) {
    this.expect = data.expect;
    this.ok = data.ok;
    this.rf = data.rf;
    this.short = data.short;
    this.date = data.date;
  }
}

export class CreateChallanInspectModel {
  challan: ChallanListModel;
  // serialId?: number;
  expectItems: CreateInspectItem[];
  // outwardSerialId?: number;
  // okNote?: string;
  // rfNote?: string;
  // shortNote?: string;

  constructor(data: {
    challan: ChallanListModel;
    // serialId?: number;
    // outwardSerialId?: number;
    expectItems: CreateInspectItem[];
    // okNote?: string;
    // rfNote?: string;
    // shortNote?: string;
  }) {
    this.challan = data.challan;
    // this.serialId = data.serialId;
    this.expectItems = data.expectItems;
    // this.outwardSerialId = data.outwardSerialId;
    // this.okNote = data.okNote;
    // this.rfNote = data.rfNote;
    // this.shortNote = data.shortNote;
  }

  toJSON(): Record<string, string | undefined>[] {
    return this.expectItems.map((e) => {
      if (!e.rf && !e.ok && !e.short) {
        throw Error("inspecition-data-not-found");
      }
      return {
        challanId: this.challan.id.toString(),
        // serialId: this.serialId?.toString(),
        // outwardSerialId: this.outwardSerialId?.toString(),
        ok: e.ok ? e.ok.toFixed(2) : undefined,
        rf: e.rf ? e.rf.toFixed(2) : undefined,
        short: e.short ? e.short.toFixed(2) : undefined,
      };
    });
  }
}

export type CreateChallanInspectResponse = {
  challanId?: number;
  expectId?: number;
  ok?: number;
  rf?: number;
  short?: number;
  date?: Date;
};

export type InspectQueryParams = {
  challanId?: number[];
  expectationId?: number[];
  serialId?: number[];
  status?: InspectionStatus[];
  serialStatus?: SerialStatus;
  startDate?: Date;
  endDate?: Date;
};
