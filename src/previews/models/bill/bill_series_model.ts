import { StocktypeModel } from "../../models/stock/stocktype_model";
import { BillType, StockCategory } from "../../models/types";

export class BillSeriesModel {
  id: number;
  billType: BillType;
  prefix: string;
  number: number;
  def: boolean;
  suffix?: string;

  constructor(data: {
    id: number;
    billType: BillType;
    prefix: string;
    number: number;
    def: boolean;
    suffix?: string;
  }) {
    this.id = data.id;
    this.billType = data.billType;
    this.prefix = data.prefix;
    this.number = data.number;
    this.def = data.def;
    this.suffix = data.suffix;
  }

  static fromJSON(map: Record<string, any>): BillSeriesModel {
    return new BillSeriesModel({
      id: map["id"],
      billType: new BillType(map["billType"]),
      prefix: map["prefix"],
      number: map["number"],
      def: map["default"],
      suffix: map["suffix"],
    });
  }
}

export class CreateBillSeriesModel {
  billType: BillType;
  prefix: string;
  number: number;
  suffix?: string;
  def: boolean;

  constructor(data: {
    billType: BillType;
    prefix: string;
    number: number;
    suffix?: string;
    def: boolean;
  }) {
    this.billType = data.billType;
    this.prefix = data.prefix;
    this.number = data.number;
    this.suffix = data.suffix;
    this.def = data.def;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      billType: this.billType?.key,
      prefix:
        this.prefix && this.prefix.trim().length > 0
          ? this.prefix.trim()
          : undefined,
      number:
        this.number && this.number > 0 ? this.number.toString() : undefined,
      suffix:
        this.suffix && this.suffix.trim().length > 0
          ? this.suffix.trim()
          : undefined,
      default:
        this.def === true ? "true" : this.def === false ? "false" : undefined,
    };
  }
}

export class UpdateBillSeriesModel {
  billType?: BillType;
  prefix?: string;
  number?: number;
  suffix?: string;
  def: boolean;

  constructor(data: {
    billType: BillType;
    prefix?: string;
    number?: number;
    suffix?: string;
    def: boolean;
  }) {
    this.billType = data.billType;
    this.prefix = data.prefix;
    this.number = data.number;
    this.suffix = data.suffix;
    this.def = data.def;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      billType: this.billType?.key,
      prefix:
        this.prefix && this.prefix.trim().length > 0
          ? this.prefix.trim()
          : undefined,
      number:
        this.number && this.number > 0 ? this.number.toString() : undefined,
      suffix:
        this.suffix && this.suffix.trim().length > 0
          ? this.suffix.trim()
          : undefined,
      default:
        this.def === true ? "true" : this.def === false ? "false" : undefined,
    };
  }
}

export type BillSerialQueryParams = {
  billType?: BillType;
  search?: string;
  def?: boolean;
};
