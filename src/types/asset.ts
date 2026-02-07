export interface AssetMetadata {
  note?: string;
  description?: string;
  author?: string;
  uploadedBy?: string;
  [key: string]: unknown;
}

export interface AssetType {
  id: string;
  name: string;
}

export type AssetDetail = Asset & {
  description: string;
  uploadedBy: string;
  uploadDate: string;
  format: string;
};

export interface Asset {
  id: string;
  title: string;
  metadata: AssetMetadata;
  assetType: AssetType;
  expired_at: string;
  created_at: string;
}

export interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetTypes: AssetType[];
  newAsset: newAsset;
  setNewAsset: (asset: newAsset) => void;
  onAddMetadata: () => void;
  onRemoveMetadata: (index: number) => void;
  onMetadataChange: (
    index: number,
    field: "key" | "value",
    value: string,
  ) => void;
  onSubmit: () => void;
  isPending: boolean;
}

export interface AssetCardProps {
  asset: Asset;
  onViewDetail: (asset: Asset) => void;
}

export interface AssetDetailModalProps {
  selectedAsset: AssetDetail | null;
  onClose: () => void;
}

export interface newAsset {
  title: string;
  assetTypeId: string;
  expired_at: string;
  metadata: Array<{
    key: string;
    value: string;
  }>;
}
