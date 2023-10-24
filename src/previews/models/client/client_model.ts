import { ClientCategory } from "../../models/types";

export class ClientModel {
  id: number;
  category: ClientCategory;
  name: string;
  discount?: number;
  broker?: BrokerModel;
  gstin?: string;
  dueDays?: number;
  contactNo?: string;
  address?: string;

  constructor(data: {
    id: number;
    category: ClientCategory;
    name: string;
    discount?: number;
    broker?: BrokerModel;
    gstin?: string;
    dueDays?: number;
    contactNo?: string;
    address?: string;
  }) {
    this.id = data.id;
    this.category = data.category;
    this.name = data.name;
    this.discount = data.discount;
    this.broker = data.broker;
    this.gstin = data.gstin;
    this.contactNo = data.contactNo;
    this.dueDays = data.dueDays;
    this.address = data.address;
  }

  static fromJSON(map: Record<string, any>): ClientModel {
    return new ClientModel({
      id: map["id"],
      category: new ClientCategory(map["category"]),
      name: map["name"],
      discount: map["discount"] ? parseFloat(map["discount"]) : undefined,
      broker: map["broker"] ? BrokerModel.fromJSON(map["broker"]) : undefined,
      dueDays: map["dueDays"],
      gstin: map["GSTIN"],
      contactNo: map["contactNo"],
      address: map["address"],
    });
  }
}

// Created because typescript sometimes throws circular type error when referencing self client model
class BrokerModel {
  id: number;
  category: ClientCategory;
  name: string;
  contactNo?: string;

  constructor(data: {
    id: number;
    category: ClientCategory;
    name: string;
    contactNo?: string;
  }) {
    this.id = data.id;
    this.category = data.category;
    this.name = data.name;
    this.contactNo = data.contactNo;
  }

  static fromJSON(map: Record<string, any>): BrokerModel {
    return new BrokerModel({
      id: map["id"],
      category: new ClientCategory(map["category"]),
      name: map["name"],
      contactNo: map["contactNo"],
    });
  }
}

export class CreateClientModel {
  category: ClientCategory;
  name: string;
  discount?: number;
  dueDays?: number;
  broker?: ClientModel;
  gstin?: string;
  contactNo?: string;
  address?: string;

  constructor(data: {
    category: ClientCategory;
    name: string;
    discount?: number;
    dueDays?: number;
    broker?: ClientModel;
    gstin?: string;
    contactNo?: string;
    address?: string;
  }) {
    this.category = data.category;
    this.name = data.name;
    this.discount = data.discount;
    this.dueDays = data.dueDays;
    this.broker = data.broker;
    this.gstin = data.gstin;
    this.contactNo = data.contactNo;
    this.address = data.address;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      category: this.category.key,
      name: this.name,
      broker: this.broker?.id.toString(),
      dueDays:
        this.dueDays && this.dueDays!.toString().length > 0
          ? this.dueDays.toString()
          : undefined,
      discount:
        this.discount && this.discount!.toString().length > 0
          ? this.discount.toString()
          : undefined,
      address:
        this.address && this.address!.toString().length > 0
          ? this.address
          : undefined,
      gstin:
        this.gstin && this.gstin!.toString().length > 0
          ? this.gstin
          : undefined,
      contactNo:
        this.contactNo && this.contactNo!.toString().length > 0
          ? this.contactNo
          : undefined,
    };
  }
}

export class UpdateClientModel {
  category?: ClientCategory;
  name?: string;
  discount?: number;
  broker?: ClientModel;
  gstin?: string;
  contactNo?: string;
  address?: string;

  constructor(data: {
    category?: ClientCategory;
    name?: string;
    discount?: number;
    broker?: ClientModel;
    gstin?: string;
    contactNo?: string;
    address?: string;
  }) {
    this.category = data.category;
    this.name = data.name;
    this.discount = data.discount;
    this.broker = data.broker;
    this.gstin = data.gstin;
    this.contactNo = data.contactNo;
    this.address = data.address;
  }

  toJSON(): Record<string, string | undefined> {
    return {
      category: this.category?.key,
      name: this.name,
      discount: this.discount?.toString(),
      brokerId: this.broker?.id.toString(),
      gstin: this.gstin,
      contactNo: this.contactNo,
      address: this.address,
    };
  }
}

export type ClientQueryParams = {
  cursor?: number;
  category?: ClientCategory[];
  search?: string;
  broker?: BrokerModel[];
  additionalInfo?: boolean;
  aggregatedData?: boolean;
  onlyCount?: boolean;
};
