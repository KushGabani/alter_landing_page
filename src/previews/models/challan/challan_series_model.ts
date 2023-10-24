import { StocktypeModel } from "../../models/stock/stocktype_model";
import { StockCategory } from "../../models/types";

export class ChallanSeriesModel {
  id: number;
  category: StockCategory;
  type?: StocktypeModel;
  prefix: string;
  number: number;
  def: boolean;
  suffix?: string;

  constructor(data: {
    id: number;
    category: StockCategory;
    type?: StocktypeModel;
    prefix: string;
    number: number;
    def: boolean;
    suffix?: string;
  }) {
    this.id = data.id;
    this.category = data.category;
    this.type = data.type;
    this.prefix = data.prefix;
    this.number = data.number;
    this.def = data.def;
    this.suffix = data.suffix;
  }

  static fromJSON(map: Record<string, any>): ChallanSeriesModel {
    return new ChallanSeriesModel({
      id: map["id"],
      category: new StockCategory(map["category"]),
      type:
        map["type"] != null ? StocktypeModel.fromJSON(map["type"]) : undefined,
      prefix: map["prefix"],
      number: map["number"],
      def: map["default"],
      suffix: map["suffix"],
    });
  }
}

export class CreateChallanSeriesModel {
  category: StockCategory;
  type?: StocktypeModel;
  prefix: string;
  number: number;
  suffix?: string;
  def: boolean;

  constructor(data: {
    category: StockCategory;
    type?: StocktypeModel;
    prefix: string;
    number: number;
    suffix?: string;
    def: boolean;
  }) {
    this.category = data.category;
    this.type = data.type;
    this.prefix = data.prefix;
    this.number = data.number;
    this.suffix = data.suffix;
    this.def = data.def;
  }

  toJSON(): Record<string, any> {
    return {
      category: this.category.key,
      typeId: this.type?.id,
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

export class UpdateChallanSeriesModel {
  category?: StockCategory;
  type?: StocktypeModel;
  prefix?: string;
  number?: number;
  suffix?: string;
  def: boolean;

  constructor(data: {
    category?: StockCategory;
    type?: StocktypeModel;
    prefix?: string;
    number?: number;
    suffix?: string;
    def: boolean;
  }) {
    this.category = data.category;
    this.type = data.type;
    this.prefix = data.prefix;
    this.number = data.number;
    this.suffix = data.suffix;
    this.def = data.def;
  }

  toJSON(): Record<string, any> {
    return {
      category: this.category?.key,
      typeId: this.type?.id,
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

export type ChallanSerialQueryParams = {
  category?: StockCategory;
  type?: StocktypeModel;
  search?: string;
  def?: boolean;
};
