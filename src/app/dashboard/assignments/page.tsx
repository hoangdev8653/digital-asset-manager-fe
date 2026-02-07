"use client";
import { useState, useMemo } from "react";
import {
  useGetAllAssignments,
  useCreateAssignment,
  useDeleteAssignment,
} from "@/hooks/useAssignment";
import { useGetAllAssets } from "@/hooks/useAsset";
import { useGetAllUser } from "@/hooks/useUser";
import CreateAssignmentModal from "./CreateAssignmentModal";
import AssignmentTable from "./AssignmentTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CreateAssignment } from "@/types/assignment";

export default function Assignments() {
  const { data: assignments, isLoading } = useGetAllAssignments();
  const { data: assets } = useGetAllAssets(1, 1000000);
  const { data: users } = useGetAllUser();
  const { mutate: createAssignment, isPending: isCreating } =
    useCreateAssignment();
  const { mutate: deleteAssignment, isPending: isDeleting } =
    useDeleteAssignment();

  // --- Logic Phân Trang ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allAssignments = Array.isArray(assignments?.data)
    ? assignments.data
    : Array.isArray(assignments?.data?.data)
      ? assignments.data.data
      : [];

  const currentData = useMemo(() => {
    if (!allAssignments.length) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allAssignments.slice(startIndex, startIndex + itemsPerPage);
  }, [allAssignments, currentPage]);
  console.log(currentData);

  const totalPages = Math.ceil((allAssignments.length || 0) / itemsPerPage);

  const handleCreate = (formData: CreateAssignment, callback: () => void) => {
    createAssignment(
      {
        asset_id: formData.assetId,
        employee_id: formData.employeeId,
        note: formData.note,
        expired_at: formData.expiredAt
          ? new Date(formData.expiredAt).toISOString()
          : null,
      },
      { onSuccess: callback },
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Bàn giao tài sản
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Quản lý việc cấp phát và thu hồi tài sản cho nhân viên.
          </p>
        </div>

        <CreateAssignmentModal
          assets={assets?.data?.data}
          users={users?.data}
          onCreate={handleCreate}
          isCreating={isCreating}
        />
      </div>

      <AssignmentTable
        data={currentData}
        isLoading={isLoading}
        onDelete={deleteAssignment}
        isDeleting={isDeleting}
      />

      {/* --- UI Phân Trang --- */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === p}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(p);
                    }}
                    className="cursor-pointer"
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
