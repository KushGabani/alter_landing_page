import {
  type BillTypeType,
  type ClientType,
  type DesignStatusType,
  type PaymentStatusType,
  type StockCategoryType,
  type PaymentModeType,
  type ReturnNoteType,
  type InspectionStatusType,
  type JobStatusType,
  type SerialStatusType,
} from "./basic";

const billTypeMap = {
  PURCHASE: {
    text: "Purchase",
    color: "#302DDF",
    backgroundColor: "#302DDF1A",
  },
  JOBWORK: {
    text: "Jobwork",
    color: "#7E56D8",
    backgroundColor: "#7E56D81A",
  },
  OUTWARD: {
    text: "Outward",
    color: "#C05B40",
    backgroundColor: "#C0B5B01A",
  },
  SALES: {
    text: "Sales",
    color: "#C0B540",
    backgroundColor: "#C0B5401A",
  },
};

export class BillType {
  key: BillTypeType;
  text: string;
  color: string;
  backgroundColor: string;

  constructor(key: BillTypeType) {
    this.key = key;
    const values = billTypeMap[key];
    this.text = values.text;
    this.color = values.color;
    this.backgroundColor = values.backgroundColor;
  }
}

const clientCategoryMap = {
  PURCHASE_PARTY: {
    id: 1,
    text: "Purchase Party",
    color: "#302DDF",
    backgroundColor: "#302DDF1A",
  },
  JOBWORK_PARTY: {
    id: 2,
    text: "Jobwork Party",
    color: "#7E56D8",
    backgroundColor: "#7E56D81A",
  },
  SALES_PARTY: {
    id: 3,
    text: "Sales Party",
    color: "#C0B540",
    backgroundColor: "#C0B5401A",
  },
  INWARD_PARTY: {
    id: 4,
    text: "Inward Party",
    color: "#FF8E00",
    backgroundColor: "#FF8E001A",
  },
  BROKER_PARTY: {
    id: 5,
    text: "Broker Party",
    color: "#2AC54C",
    backgroundColor: "#2AC54C1A",
  },
};

export class ClientCategory {
  id: number;
  key: ClientType;
  text: string;
  color: string;
  backgroundColor: string;

  constructor(key: ClientType) {
    this.key = key;
    const values = clientCategoryMap[key];
    this.id = values.id;
    this.text = values.text;
    this.color = values.color;
    this.backgroundColor = values.backgroundColor;
  }
}

export class DesignStatus {
  id: number;
  key: DesignStatusType;
  text: string;
  color: string;
  backgroundColor: string;

  private map = {
    SKETCHING: {
      id: 1,
      text: "Sketching",
      color: "#302DDF",
      backgroundColor: "#302DDF1A",
    },
    TRACING: {
      id: 2,
      text: "Tracing",
      color: "#7E56D8",
      backgroundColor: "#7E56D81A",
    },
    PUNCHING: {
      id: 3,
      text: "Punching",
      color: "#C0B540",
      backgroundColor: "#C0B5401A",
    },
    REVIEW: {
      id: 4,
      text: "Review",
      color: "#FF8E00",
      backgroundColor: "#FF8E001A",
    },
    COMPLETE: {
      id: 5,
      text: "Complete",
      color: "#0165FF",
      backgroundColor: "#E2ECFF",
    },
  };

  constructor(key: DesignStatusType) {
    this.id = this.map[key].id;
    this.key = key;
    this.text = this.map[key].text;
    this.color = this.map[key].color;
    this.backgroundColor = this.map[key].backgroundColor;
  }
}

const paymentStatusMap = {
  PAID: { id: 1, text: "Paid", color: "green" },
  NOT_PAID: { id: 2, text: "Not Paid", color: "red" },
  PART_PAID: { id: 3, text: "Part Paid", color: "orange" },
  DUE: { id: 4, text: "Due", color: "red" },
  PENDING: { id: 5, text: "Pending", color: "orange" },
};

export class PaymentStatus {
  id: number;
  key: PaymentStatusType;
  text: string;
  color: string;

  constructor(key: PaymentStatusType) {
    this.key = key;
    const value = paymentStatusMap[key];
    this.id = value.id;
    this.text = value.text;
    this.color = value.color;
  }
}

const stockCategoryMap = {
  PURCHASE: {
    id: 1,
    text: "Purchase",
    color: "#302DDF",
    backgroundColor: "#302DDF1A",
  },
  JOBWORK: {
    id: 2,
    text: "Jobwork",
    color: "#7E56D8",
    backgroundColor: "#7E56D81A",
  },
  DESIGN: {
    id: 3,
    text: "Design",
    color: "#C0B540",
    backgroundColor: "#C0B5401A",
  },
  INWARD: {
    id: 4,
    text: "Inward",
    color: "#FF8E00",
    backgroundColor: "#FF8E001A",
  },
  OUTWARD: {
    id: 5,
    text: "Outward",
    color: "#2AC54C",
    backgroundColor: "#2AC54C1A",
  },
  SALES: {
    id: 5,
    text: "Sales",
    color: "#2A3D4C",
    backgroundColor: "#2A3D4C1A",
  },
  DELIVERED: {
    id: 7,
    text: "Delivered",
    color: "#2AC54C",
    backgroundColor: "#2AC54C1A",
  },
};

export class StockCategory {
  id: number;
  key: StockCategoryType;
  text: string;
  color: string;
  backgroundColor: string;

  constructor(key: StockCategoryType) {
    this.key = key;
    const values = stockCategoryMap[key];
    this.id = values.id;
    this.text = values.text;
    this.color = values.color;
    this.backgroundColor = values.backgroundColor;
  }
}

export class PaymentMode {
  key: PaymentModeType;
  text: string;
  icon: string;
  id: number;
  private map = {
    CASH: {
      id: 1,
      text: "Cash",
      icon: "💰",
    },
    CHEQUE: {
      id: 2,
      text: "Cheque",
      icon: "🏦",
    },
    RETURN_NOTE: {
      id: 3,
      text: "Return Note",
      icon: "📝",
    },
  };

  constructor(key: PaymentModeType) {
    this.id = this.map[key].id;
    this.key = key;
    this.text = this.map[key].text;
    this.icon = this.map[key].icon;
  }
}

export class ReturnType {
  key: ReturnNoteType;
  text: string;
  color: string;

  private map = {
    CREDIT_NOTE: {
      text: "Credit Note",
      color: "green",
    },
    DEBIT_NOTE: {
      text: "Debit Note",
      color: "orange",
    },
  };

  constructor(key: ReturnNoteType) {
    this.key = key;
    this.text = this.map[key].text;
    this.color = this.map[key].color;
  }
}

export class InspectionStatus {
  id: number;
  key: InspectionStatusType;
  text: string;
  color: string;

  private map = {
    ALL: { id: 1, text: "ALL", color: "primary-400" },
    OK: { id: 2, text: "OK", color: "green" },
    RF: { id: 3, text: "RF", color: "orange" },
    SHORT: { id: 4, text: "ST", color: "red" },
  };

  constructor(key: InspectionStatusType) {
    this.key = key;
    this.id = this.map[key].id;
    this.text = this.map[key].text;
    this.color = this.map[key].color;
  }
}

const jobStatusMap = {
  ALL: { id: 1, text: "All", color: "red", icon: "" },
  DUE: { id: 2, text: "Due", color: "red", icon: "" },
  PENDING: { id: 3, text: "Pending", color: "orange", icon: "" },
  IN_PROCESS: {
    id: 4,
    text: "In Process",
    color: "red",
    icon: "/in_process_icon.svg",
  },
  PART_RECEIVED: {
    id: 5,
    text: "Part Received",
    color: "orange",
    icon: "/part_received_icon.svg",
  },
  COMPLETE: {
    id: 6,
    text: "Complete",
    color: "green",
    icon: "/complete_icon.svg",
  },
  MOVED_TO_OUTWARD: {
    id: 7,
    text: "Moved To Outward",
    color: "green",
    icon: "",
  },
  READY_FOR_OUTWARD: {
    id: 8,
    text: "Ready For Outward",
    color: "green",
    icon: "",
  },
};

export class JobStatus {
  id: number;
  key: JobStatusType;
  text: string;
  color: string;
  icon: string;

  constructor(key: JobStatusType) {
    this.key = key;
    const value = jobStatusMap[key];
    this.id = value.id;
    this.text = value.text;
    this.color = value.color;
    this.icon = value.icon;
  }
}

export class SerialStatus {
  id: number;
  key: SerialStatusType;
  text: string;

  private map = {
    all: {
      id: 1,
      text: "All",
    },
    onlyAvailable: {
      id: 2,
      text: "Only Available",
    },
    unavailable: {
      id: 3,
      text: "Unavailable",
    },
    lowInStock: {
      id: 4,
      text: "Low In Stock",
    },
  };

  constructor(key: SerialStatusType) {
    this.key = key;
    this.id = this.map[key].id;
    this.text = this.map[key].text!;
  }
}
