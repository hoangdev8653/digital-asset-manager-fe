export interface AssetType {
    id: string;
    name: string;
    code: string;
    description?: string;
}

export interface Asset {
    id: string;
    name: string;
    description?: string;
    url: string;
    typeId: string;
    type?: AssetType; // Populated asset type
    size: number; // in bytes
    mimeType: string;
    uploadedBy: string; // User ID
    createdAt: string;
    updatedAt: string;
}

export interface CreateAssetRequest { // Usually sent as FormData
    name: string;
    description?: string;
    typeId: string;
    file: File;
}
