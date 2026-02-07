export interface CreateAssignment {
  assetId: string;
  employeeId: string;
  note?: string;
  expiredAt: string | null;
}

export interface AssetForSelection {
  id: string;
  title: string;
  status: "available" | "unavailable" | string;
}

export interface UserForSelection {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AssetInfo {
  title: string;
  metadata?: {
    note?: string;
  };
}

export interface EmployeeInfo {
  name: string;
  role?: string;
}

export interface Assignment {
  id: string;
  asset: AssetInfo;
  employee: EmployeeInfo;
  assigned_at: string;
  expired_at?: string | null;
  status: "active" | "inactive";
}

export interface AssignmentTableProps {
  data: Assignment[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export interface CreateAssignmentModalProps {
  assets?: AssetForSelection[];
  users?: UserForSelection[];
  onCreate: (formData: CreateAssignment, callback: () => void) => void;
  isCreating: boolean;
}
