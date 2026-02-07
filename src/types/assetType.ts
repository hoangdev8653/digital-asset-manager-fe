export interface AssetType {
  id: string;
  name: string;
  code: string;
  description?: string;
}

export interface AssetTypeCardProps {
  type: AssetType;
  onEdit: (type: AssetType) => void;
  onDelete: (id: string) => void;
}

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isDeleting: boolean;
  onConfirm: () => void;
}
