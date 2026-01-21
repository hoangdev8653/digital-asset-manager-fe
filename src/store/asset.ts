import {create} from "zustand"

interface AssetStore {
  selectedAssetId: string | null;
  setSelectedAssetId: (id: string | null) => void;
}

// Store này chỉ quản lý trạng thái UI (Client State)
// Việc fetch data đã có React Query lo
export const useAssetStore = create<AssetStore>((set) => ({
    selectedAssetId: null,
    setSelectedAssetId: (id) => set({ selectedAssetId: id }),
}))