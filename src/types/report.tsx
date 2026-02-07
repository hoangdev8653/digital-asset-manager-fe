export interface ImagePreviewProps {
    imageUrl: string | null;
    onClose: () => void;
}

export interface ReportTableProps {
    data: any[];
    onViewImage: (url: string) => void;
    onEdit: (item: any) => void;
}

export
    interface UpdateReportProps {
    report: any | null;
    newStatus: string;
    adminNote: string;
    isPending: boolean;
    onStatusChange: (status: string) => void;
    onNoteChange: (note: string) => void;
    onClose: () => void;
    onUpdate: () => void;
}