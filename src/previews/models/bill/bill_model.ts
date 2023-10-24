import {
  BillLineItemModel,
  BillPaymentModel,
  ClientModel,
  CreateBillLineItemModelWithBill,
  CreateBillPaymentWithBill,
  DesignModel,
  ReturnModel,
  ChallanListModel,
  StocktypeModel,
  BillSeriesModel,
} from "../../models";
import { CreateChallanIssueWithChallan } from "../../models/challan/challan_issue_model";
import {
  BillType,
  ClientCategory,
  PaymentMode,
  PaymentStatus,
  StockCategory,
} from "../../models/types";
import { getServerDate } from "../../components/global/utils";
import { onlyUniqueObjects } from "../../components/global/utils";

export class BillModel {
  id: number;
  billNo: string;
  type: BillType;
  challans: ChallanListModel[];
  client: ClientModel;
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
    challans: ChallanListModel[];
    type: BillType;
    client: ClientModel;
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
    // returnNotes?: ReturnModel[];
  }) {
    this.id = data.id;
    this.billNo = data.billNo;
    this.challans = data.challans;
    this.type = data.type;
    this.client = data.client;
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

  toBillListModel(): BillListModel {
    return new BillListModel({
      id: this.id,
      billNo: this.billNo,
      client: this.client,
      type: this.type,
      orderDate: this.orderDate,
      dueDate: this.dueDate,
      challanIds: this.challans.map((e) => e.id),
      designs: onlyUniqueObjects(
        this.challans.reduce<DesignModel[]>(
          (list, val) => [...list, ...val.designs],
          []
        )
      ),
      paymentStatus: this.paymentStatus,
      total: this.total,
      discount: this.discount,
      cgst: this.cgst,
      sgst: this.sgst,
      roundoff: this.roundoff,
      grandTotal: this.grandTotal,
    });
  }

  static fromJSON(map: Record<string, any>): BillModel {
    return new BillModel({
      id: map["id"],
      billNo: map["billNo"],
      challans: map["Challan"]
        ? map["Challan"].map((e: Record<string, any>) =>
            ChallanListModel.fromJSON(e, map["client"])
          )
        : [],
      type: new BillType(map["type"]),
      client: ClientModel.fromJSON(map["client"]),
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

export class BillListModel {
  id: number;
  billNo: string;
  challanIds: number[];
  type: BillType;
  client: ClientModel;
  designs: DesignModel[];
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
    challanIds: number[];
    type: BillType;
    client: ClientModel;
    designs: DesignModel[];
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
    this.challanIds = data.challanIds;
    this.type = data.type;
    this.client = data.client;
    this.designs = data.designs;
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
    return new BillListModel({
      id: map["id"],
      billNo: map["billNo"],
      challanIds:
        map["challanId"] ??
        (map["Challan"] &&
          map["Challan"].map((e: Record<string, any>) => e["id"])),
      type: new BillType(map["type"]),
      client: ClientModel.fromJSON(map["client"]),
      designs: map["Challan"]
        ? onlyUniqueObjects<DesignModel>(
            (map["Challan"] as Record<string, any>[]).reduce<DesignModel[]>(
              (list: DesignModel[], challan: Record<string, any>) => {
                if (!challan["Designs"]) return list;
                return [
                  ...list,
                  ...challan["Designs"].map((design: Record<string, any>) =>
                    DesignModel.fromJSON(design)
                  ),
                ];
              },
              []
            )
          )
        : [],
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

export class CreateBillModel {
  series?: BillSeriesModel;
  billNo: string;
  type: BillType;
  clientCategory: ClientCategory;
  client?: ClientModel;
  challanCategory: StockCategory;
  challanType?: StocktypeModel;
  challan?: ChallanListModel;
  designs: DesignModel[];
  orderDate: Date;
  dueDays: number;
  dueDate: Date;
  total: number;
  discount: number;
  cgst: number;
  sgst: number;
  roundoff: number;
  grandTotal: number;
  paymentStatus: PaymentStatus;
  file?: string;
  notes?: string;
  lineitems?: CreateBillLineItemModelWithBill[];
  payments?: CreateBillPaymentWithBill[];
  issue?: CreateChallanIssueWithChallan[];

  constructor(data: {
    series?: BillSeriesModel;
    billNo: string;
    type: BillType;
    clientCategory: ClientCategory;
    client?: ClientModel;
    challan?: ChallanListModel;
    challanCategory: StockCategory;
    challanType?: StocktypeModel;
    designs: DesignModel[];
    orderDate: Date;
    dueDays: number;
    dueDate: Date;
    total: number;
    discount: number;
    cgst: number;
    sgst: number;
    roundoff: number;
    grandTotal: number;
    paymentStatus: PaymentStatus;
    file?: string;
    notes?: string;
    lineitems?: CreateBillLineItemModelWithBill[];
    payments?: CreateBillPaymentWithBill[];
    issue?: CreateChallanIssueWithChallan[];
  }) {
    this.series = data.series;
    this.billNo = data.billNo;
    this.type = data.type;
    this.clientCategory = data.clientCategory;
    this.client = data.client;
    this.challan = data.challan;
    this.challanCategory = data.challanCategory;
    this.challanType = data.challanType;
    this.designs = data.designs;
    this.orderDate = data.orderDate;
    this.dueDays = data.dueDays;
    this.dueDate = data.dueDate;
    this.total = data.total;
    this.discount = data.discount;
    this.cgst = data.cgst;
    this.sgst = data.sgst;
    this.roundoff = data.roundoff;
    this.grandTotal = data.grandTotal;
    this.paymentStatus = data.paymentStatus;
    this.file = data.file;
    this.notes = data.notes;
    this.lineitems = data.lineitems;
    this.payments = data.payments;
    this.issue = data.issue;
  }

  toJSON(): Record<
    string,
    string | undefined | Record<string, string | undefined>[]
  > {
    if (!this.client) throw new Error("required-client");
    const map: Record<
      string,
      string | undefined | Record<string, string | undefined>[]
    > = {
      serialId: this.series?.id.toString(),
      billNo: this.billNo,
      type: this.type.key,
      clientId: this.client.id.toString(),
      challanIds: this.challan ? this.challan.id.toString() : undefined,
      challanCategory: this.challanCategory.key,
      challanTypeId: this.challanType?.id.toString(),
      designId: this.designs.join(","),
      orderDate: getServerDate(this.orderDate),
      dueDate: getServerDate(this.dueDate),
      total: this.total.toString(),
      discount: this.discount.toString(),
      cgst: this.cgst.toString(),
      sgst: this.sgst.toString(),
      roundoff: this.roundoff.toString(),
      grandTotal: this.grandTotal.toString(),
      notes: this.notes,
      file: this.file,
      paymentStatus: this.paymentStatus.key,
      lineItems:
        this.lineitems && this.lineitems.length > 0
          ? this.lineitems.map((e) => e.toJSON())
          : [],
      payments:
        this.payments && this.payments.length > 0
          ? this.payments.map((e) => e.toJSON())
          : [],
      issue:
        this.issue && this.issue.length > 0
          ? this.issue?.map((e) => e.toJSON())
          : [],
    };

    return map;
  }
}

export class UpdateBillModel {
  billNo?: string;
  client?: ClientModel;
  orderDate?: Date;
  dueDate?: Date;
  total?: number;
  discount?: number;
  cgst?: number;
  sgst?: number;
  roundoff?: number;
  grandTotal?: number;
  file?: string;
  notes?: string;

  constructor(data: {
    billNo?: string;
    client?: ClientModel;
    orderDate?: Date;
    dueDate?: Date;
    total?: number;
    discount?: number;
    cgst?: number;
    sgst?: number;
    roundoff?: number;
    grandTotal?: number;
    file?: string;
    notes?: string;
  }) {
    this.billNo = data.billNo;
    this.client = data.client;
    this.orderDate = data.orderDate;
    this.dueDate = data.dueDate;
    this.total = data.total;
    this.discount = data.discount;
    this.cgst = data.cgst;
    this.sgst = data.sgst;
    this.roundoff = data.roundoff;
    this.grandTotal = data.grandTotal;
    this.file = data.file;
    this.notes = data.notes;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      billNo: this.billNo?.toString(),
      clientId: this.client?.id.toString(),
      orderDate: this.orderDate ? getServerDate(this.orderDate) : undefined,
      dueDate: this.dueDate ? getServerDate(this.dueDate) : undefined,
      total: this.total?.toString(),
      cgst: this.cgst?.toString(),
      sgst: this.sgst?.toString(),
      discount: this.discount?.toString(),
      roundoff: this.roundoff?.toString(),
      grandTotal: this.grandTotal?.toString(),
      file: this.file?.toString(),
      notes: this.notes?.toString(),
    };
  }
}

export type BillQueryParams = {
  cursor?: number;
  type?: BillType;
  search?: string;
  exact?: boolean;
  paymentStatus?: PaymentStatus;
  clients?: ClientModel[];
  designs?: DesignModel[];
  sortBy?: string;
  startDueDate?: Date;
  startOrderDate?: Date;
  endOrderDate?: Date;
  endDueDate?: Date;
  aggregatedData?: boolean;
  onlyCount?: boolean;
};

export type PaymentQueryParams = {
  bill?: BillListModel;
  mode?: PaymentMode;
  startDate?: Date;
  endDate?: Date;
};
