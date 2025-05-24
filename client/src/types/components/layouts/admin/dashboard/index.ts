interface ReportCardType {
  heading: string;
  subline?: string;
  amount: number;
  type: "deposit" | "difference" | "collection";
}

type CollectionType = {
  amount: number;
  date: Date | string;
};

type DepositType = {
  amount: number;
  date: Date | string;
};

type TransactionType = {
  location: string;
  id: string;
  emp: {
    id: string
    name: string
  }
  difference: number;
} & (
  | { collection: CollectionType; deposit: never }
  | { collection: never; deposit: DepositType }
  | { collection: CollectionType; deposit: DepositType }
);

interface PaginationType {
  totalPages?: number;
  currentPage?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
}

interface FormRowType {
  id: string;
  amount: string;
  date: string;
  location: string;
  type: "deposit" | "collection" | "";
}

interface EmployeeFormDataType {
  employeeId: string;
  rows: FormRowType[];
}

export type {
  ReportCardType,
  TransactionType,
  PaginationType,
  FormRowType,
  EmployeeFormDataType,
};
