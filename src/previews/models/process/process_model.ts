import {
  BillType,
  InspectionStatus,
  JobStatus,
  PaymentStatus,
  StockCategory,
} from "../../models/types";

import {
  ClientModel,
  DesignModel,
  StocktypeModel,
  ChallanExpectModel,
  ChallanLineItemModel,
  ChallanIssueModel,
  BillLineItemModel,
  BillPaymentModel,
  ReturnModel,
  ChallanListModel,
  BillListModel,
} from "../../models";

export class ProcessModel {
  id: number;
  challanNo: string;
  isSubChallan: boolean;
  clientChallanId?: string;
  category: StockCategory;
  client: ClientModel;
  type?: StocktypeModel;
  issueDate: Date;
  dueDate: Date;
  designs: DesignModel[];
  lot?: string;
  jobStatus: JobStatus;
  notes?: string;
  expect?: ChallanExpectModel[];
  lineitems?: ChallanLineItemModel[];
  mainChallanIds: number[];
  parentChallanIds: number[];
  issued?: ChallanIssueModel[];
  billId?: number;
  bill?: ProcessBillModel;

  constructor(data: {
    id: number;
    challanNo: string;
    isSubChallan: boolean;
    clientChallanId?: string;
    category: StockCategory;
    client: ClientModel;
    type?: StocktypeModel;
    issueDate: Date;
    dueDate: Date;
    designs: DesignModel[];
    lot?: string;
    jobStatus: JobStatus;
    notes?: string;
    expect?: ChallanExpectModel[];
    lineitems?: ChallanLineItemModel[];
    mainChallanIds: number[];
    parentChallanIds: number[];
    issued?: ChallanIssueModel[];
    billId?: number;
    bill?: ProcessBillModel;
  }) {
    this.id = data.id;
    this.challanNo = data.challanNo.toUpperCase();
    this.isSubChallan = data.isSubChallan;
    this.clientChallanId = data.clientChallanId;
    this.category = data.category;
    this.client = data.client;
    this.type = data.type;
    this.issueDate = data.issueDate;
    this.dueDate = data.dueDate;
    this.designs = data.designs;
    this.lot = data.lot;
    this.jobStatus = data.jobStatus;
    this.notes = data.notes;
    this.expect = data.expect;
    this.lineitems = data.lineitems;
    this.mainChallanIds = data.mainChallanIds;
    this.parentChallanIds = data.parentChallanIds;
    this.issued = data.issued;
    this.billId = data.billId;
    this.bill = data.bill;
  }

  static fromJSON(map: { [key: string]: any }): ProcessModel {
    return new ProcessModel({
      id: map["id"],
      challanNo: map["challanNo"]?.toUpperCase(),
      isSubChallan: map["isSubChallan"],
      clientChallanId: map["clientChallanId"]?.toUpperCase(),
      category: new StockCategory(map["category"]),
      client: ClientModel.fromJSON(map["client"]),
      type: map["type"] ? StocktypeModel.fromJSON(map["type"]) : undefined,
      issueDate: new Date(map["issueDate"]),
      dueDate: new Date(map["dueDate"]),
      designs: map["Designs"]
        ? map["Designs"].map((e: Record<string, any>) =>
            DesignModel.fromJSON(e)
          )
        : undefined,
      lot: map["lot"],
      jobStatus: new JobStatus(map["jobStatus"]),
      notes: map["notes"] ?? undefined,
      expect: map["ChallanExpectation"]
        ? map["ChallanExpectation"].map((e: Record<string, any>) =>
            ChallanExpectModel.fromJSON(e)
          )
        : undefined,
      billId: map["billId"] ?? undefined,
      bill: map["bill"] ? ProcessBillModel.fromJSON(map["bill"]) : undefined,
      mainChallanIds: map["MainChallans"]
        ? map["MainChallans"].map((e: Record<string, any>) =>
            parseInt(e["id"].toString())
          )
        : [],
      parentChallanIds: map["ParentChallans"]
        ? map["ParentChallans"].map((e: Record<string, any>) =>
            parseInt(e["id"].toString())
          )
        : [],
      issued: map["ChallanIssue"]
        ? map["ChallanIssue"].map((e: Record<string, any>) =>
            ChallanIssueModel.fromJSON(e)
          )
        : undefined,
      lineitems: map["ChallanLineItem"]
        ? map["ChallanLineItem"].map((e: Record<string, any>) =>
            ChallanLineItemModel.fromJSON(e)
          )
        : undefined,
    });
  }

  toChallanListModel(): ChallanListModel {
    return new ChallanListModel({
      id: this.id,
      challanNo: this.challanNo,
      isSubChallan: this.isSubChallan,
      category: this.category,
      type: this.type,
      issueDate: this.issueDate,
      dueDate: this.dueDate,
      designs: this.designs,
      lot: this.lot,
      client: this.client,
      clientChallanId: this.clientChallanId,
      jobStatus: this.jobStatus,
      billId: this.billId,
      notes: this.notes,
      mainChallanIds: this.mainChallanIds,
      parentChallanIds: this.parentChallanIds,
    });
  }

  toBillListModel(): BillListModel {
    return new BillListModel({
      id: this.bill!.id,
      billNo: this.bill!.billNo,
      client: this.client,
      type: this.bill!.type,
      orderDate: this.bill!.orderDate,
      dueDate: this.bill!.dueDate,
      challanIds: [this.id],
      designs: this.designs,
      paymentStatus: this.bill!.paymentStatus,
      total: this.bill!.total,
      discount: this.bill!.discount,
      cgst: this.bill!.cgst,
      sgst: this.bill!.sgst,
      roundoff: this.bill!.roundoff,
      grandTotal: this.bill!.grandTotal,
    });
  }
}

export class ProcessListModel {
  id: number;
  challanNo: string;
  isSubChallan: boolean;
  category: StockCategory;
  client: ClientModel;
  clientChallanId?: string;
  type?: StocktypeModel;
  issueDate: Date;
  dueDate: Date;
  designs: DesignModel[];
  lot?: string;
  jobStatus: JobStatus;
  notes?: string;
  bill?: ProcessBillListModel;

  constructor(data: {
    id: number;
    challanNo: string;
    isSubChallan: boolean;
    clientChallanId?: string;
    client: ClientModel;
    category: StockCategory;
    type?: StocktypeModel;
    issueDate: Date;
    dueDate: Date;
    designs: DesignModel[];
    lot?: string;
    jobStatus: JobStatus;
    notes?: string;
    bill?: ProcessBillListModel;
  }) {
    this.id = data.id;
    this.challanNo = data.challanNo;
    this.isSubChallan = data.isSubChallan;
    this.clientChallanId = data.clientChallanId;
    this.client = data.client;
    this.category = data.category;
    this.type = data.type;
    this.issueDate = data.issueDate;
    this.dueDate = data.dueDate;
    this.designs = data.designs;
    this.lot = data.lot;
    this.jobStatus = data.jobStatus;
    this.notes = data.notes;
    this.bill = data.bill;
  }

  static fromJSON(
    map: Record<string, any>,
    clientMap?: Record<string, any>
  ): ProcessListModel {
    return new ProcessListModel({
      id: map["id"],
      challanNo: map["challanNo"]?.toUpperCase(),
      isSubChallan: map["isSubChallan"] ?? false,
      clientChallanId: map["clientChallanId"],
      client: clientMap
        ? ClientModel.fromJSON(clientMap)
        : ClientModel.fromJSON(map["client"]),
      category: new StockCategory(map["category"]),
      type: map["type"] ? StocktypeModel.fromJSON(map["type"]) : undefined,
      issueDate: new Date(map["issueDate"]),
      dueDate: new Date(map["dueDate"]),
      designs: map["Designs"]
        ? map["Designs"].map((e: Record<string, any>) =>
            DesignModel.fromJSON(e)
          )
        : [],
      lot: map["lot"],
      jobStatus: new JobStatus(map["jobStatus"]),
      notes: map["notes"] ?? undefined,
      bill: map["bill"]
        ? ProcessBillListModel.fromJSON(map["bill"])
        : undefined,
    });
  }
}

export class ProcessBillListModel {
  id: number;
  billNo: string;
  type: BillType;
  orderDate: Date;
  dueDate: Date;
  total: number;
  cgst: number;
  sgst: number;
  discount: number;
  roundoff: number;
  grandTotal: number;
  paymentStatus: PaymentStatus;

  constructor(data: {
    id: number;
    billNo: string;
    type: BillType;
    orderDate: Date;
    dueDate: Date;
    total: number;
    cgst: number;
    sgst: number;
    discount: number;
    roundoff: number;
    grandTotal: number;
    paymentStatus: PaymentStatus;
  }) {
    this.id = data.id;
    this.billNo = data.billNo;
    this.type = data.type;
    this.orderDate = new Date(data.orderDate);
    this.dueDate = new Date(data.dueDate);
    this.total = data.total;
    this.cgst = data.cgst;
    this.sgst = data.sgst;
    this.discount = data.discount;
    this.roundoff = data.roundoff;
    this.grandTotal = data.grandTotal;
    this.paymentStatus = data.paymentStatus;
  }

  static fromJSON(map: Record<string, any>) {
    return new ProcessBillListModel({
      id: map["id"],
      billNo: map["billNo"],
      type: new BillType(map["type"]),
      orderDate: new Date(map["orderDate"]),
      dueDate: new Date(map["dueDate"]),
      total: parseFloat(map["grandTotal"].toString()),
      cgst: parseFloat(map["cgst"].toString()),
      sgst: parseFloat(map["sgst"].toString()),
      discount: parseFloat(map["discount"].toString()),
      roundoff: parseFloat(map["roundoff"].toString()),
      grandTotal: parseFloat(map["grandTotal"].toString()),
      paymentStatus: new PaymentStatus(map["paymentStatus"]),
    });
  }
}

export class ProcessBillModel {
  id: number;
  billNo: string;
  type: BillType;
  orderDate: Date;
  dueDate: Date;
  total: number;
  discount: number;
  cgst: number;
  sgst: number;
  roundoff: number;
  grandTotal: number;
  paymentStatus: PaymentStatus;
  notes?: string;
  file?: string;
  lineitems: BillLineItemModel[];
  payments: BillPaymentModel[];
  // returnNotes: ReturnModel[];

  constructor(data: {
    id: number;
    billNo: string;
    type: BillType;
    orderDate: Date;
    dueDate: Date;
    total: number;
    discount: number;
    cgst: number;
    sgst: number;
    roundoff: number;
    grandTotal: number;
    paymentStatus: PaymentStatus;
    notes?: string;
    file?: string;
    lineitems?: BillLineItemModel[];
    payments?: BillPaymentModel[];
    returnNotes?: ReturnModel[];
  }) {
    this.id = data.id;
    this.billNo = data.billNo;
    this.type = data.type;
    this.orderDate = data.orderDate;
    this.dueDate = data.dueDate;
    this.total = data.total;
    this.discount = data.discount;
    this.cgst = data.cgst;
    this.sgst = data.sgst;
    this.roundoff = data.roundoff;
    this.grandTotal = data.grandTotal;
    this.paymentStatus = data.paymentStatus;
    this.notes = data.notes;
    this.file = data.file;
    this.lineitems = data.lineitems || [];
    this.payments = data.payments || [];
    // this.returnNotes = data.returnNotes || [];
  }

  toBillListModel(): ProcessBillListModel {
    return new ProcessBillListModel({
      id: this.id,
      billNo: this.billNo,
      type: this.type,
      orderDate: this.orderDate,
      dueDate: this.dueDate,
      paymentStatus: this.paymentStatus,
      total: this.total,
      discount: this.discount,
      cgst: this.cgst,
      sgst: this.sgst,
      roundoff: this.roundoff,
      grandTotal: this.grandTotal,
    });
  }

  static fromJSON(map: Record<string, any>): ProcessBillModel {
    return new ProcessBillModel({
      id: map["id"],
      billNo: map["billNo"],
      type: new BillType(map["type"]),
      orderDate: new Date(map["orderDate"]),
      dueDate: new Date(map["dueDate"]),
      total: parseFloat(map["total"]),
      discount: parseFloat(map["discount"]),
      cgst: parseFloat(map["cgst"]),
      sgst: parseFloat(map["sgst"]),
      roundoff: parseFloat(map["roundoff"]),
      grandTotal: parseFloat(map["grandTotal"]),
      paymentStatus: new PaymentStatus(map["paymentStatus"]),
      file: map["file"],
      notes: map["notes"] ?? undefined,
      lineitems:
        map["BillLineItem"]?.map((e: any) => BillLineItemModel.fromJSON(e)) ||
        [],
      payments:
        map["BillPayment"]?.map((e: any) => BillPaymentModel.fromJSON(e)) || [],
      // returnNotes:
      //   map['ReturnNote']?.map((e: any) => ReturnModel.fromJSON(e)) || [],
    });
  }
}

export type ProcessQueryParams = {
  cursor?: number;
  aggregatedData?: boolean;
  onlyCount?: boolean;
  exact?: boolean;

  // CHALLAN PARAMS
  id?: number;
  search?: string;
  isSubChallan?: boolean;
  category?: StockCategory[];
  notCategory?: StockCategory[];
  clients?: ClientModel[];
  types?: StocktypeModel[];
  notTypes?: StocktypeModel[];
  designs?: DesignModel[];
  startIssueDate?: Date;
  endIssueDate?: Date;
  startDueDate?: Date;
  endDueDate?: Date;
  lot?: string;
  jobStatus?: JobStatus;
  mainChallanIds?: number[];
  parentChallanIds?: number[];
  mainChallanClient?: ClientModel;
  hasBill?: boolean;
  receiveStatus?: InspectionStatus;
  includeMainChallans?: boolean;

  // BILL PARAMS
  billType?: BillType;
  paymentStatus?: PaymentStatus;
  startOrderDate?: Date;
  endOrderDate?: Date;
  startPaymentDueDate?: Date;
  endPaymentDueDate?: Date;
};
