"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Check,
  X,
  Loader2,
  Calendar,
  FileText,
  Clock,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface LeaveApplication {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: string;
  remarks?: string;
  appliedAt: string;
  staffName?: string;
  staffId?: string;
}

interface FormData {
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: string;
  reason: string;
}

const initialFormData: FormData = {
  leaveType: "casual",
  startDate: "",
  endDate: "",
  totalDays: "",
  reason: "",
};

export default function LeavePage() {
  const [leaveApplications, setLeaveApplications] = useState<
    LeaveApplication[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveApplication | null>(
    null,
  );
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchLeaveApplications();
  }, [filterStatus]);

  async function fetchLeaveApplications() {
    try {
      let url = `${API_URL}/api/leave`;
      const params = new URLSearchParams();
      if (filterStatus) params.append("status", filterStatus);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setLeaveApplications(
          Array.isArray(data)
            ? data.map(
                (
                  l: LeaveApplication & {
                    staff?: {
                      user?: { firstName?: string; lastName?: string };
                    };
                  },
                ) => ({
                  ...l,
                  staffName: l.staff?.user
                    ? `${l.staff.user.firstName} ${l.staff.user.lastName || ""}`
                    : "Unknown",
                }),
              )
            : [],
        );
      }
    } catch (err) {
      console.error("Failed to fetch leave applications:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredLeave = leaveApplications.filter(
    (l) =>
      l.staffName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.leaveType?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  async function handleApproveLeave() {
    if (!selectedLeave) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/leave`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedLeave.id,
          status: "approved",
          remarks: remarks,
        }),
      });

      if (res.ok) {
        alert("Leave approved successfully!");
        setShowApproveModal(false);
        setSelectedLeave(null);
        setRemarks("");
        fetchLeaveApplications();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to approve leave");
      }
    } catch (error) {
      alert("Failed to approve leave");
    } finally {
      setSaving(false);
    }
  }

  async function handleRejectLeave() {
    if (!selectedLeave) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/leave`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedLeave.id,
          status: "rejected",
          remarks: remarks,
        }),
      });

      if (res.ok) {
        alert("Leave rejected!");
        setShowRejectModal(false);
        setSelectedLeave(null);
        setRemarks("");
        fetchLeaveApplications();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to reject leave");
      }
    } catch (error) {
      alert("Failed to reject leave");
    } finally {
      setSaving(false);
    }
  }

  function openViewModal(leave: LeaveApplication) {
    setSelectedLeave(leave);
    setShowViewModal(true);
  }

  function openApproveModal(leave: LeaveApplication) {
    setSelectedLeave(leave);
    setShowApproveModal(true);
  }

  function openRejectModal(leave: LeaveApplication) {
    setSelectedLeave(leave);
    setShowRejectModal(true);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "casual":
        return "bg-blue-100 text-blue-700";
      case "sick":
        return "bg-purple-100 text-purple-700";
      case "earned":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Leave Management
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64"
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeave.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No leave applications found
                </div>
              ) : (
                filteredLeave.map((leave) => (
                  <div
                    key={leave.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {leave.staffName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeBadge(
                                leave.leaveType,
                              )}`}
                            >
                              {leave.leaveType}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                                leave.status,
                              )}`}
                            >
                              {leave.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        Applied:{" "}
                        {new Date(leave.appliedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 ml-13">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(leave.startDate).toLocaleDateString()} -{" "}
                          {new Date(leave.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="font-medium text-indigo-600">
                        {leave.totalDays} day(s)
                      </span>
                    </div>

                    {leave.reason && (
                      <p className="text-sm text-gray-600 ml-13 mb-3">
                        Reason: {leave.reason}
                      </p>
                    )}

                    {leave.status === "pending" ? (
                      <div className="flex gap-2 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => openViewModal(leave)}
                          className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openApproveModal(leave)}
                          className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => openRejectModal(leave)}
                          className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 flex items-center justify-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="pt-3 border-t border-gray-100">
                        {leave.remarks && (
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Remarks:</span>{" "}
                            {leave.remarks}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* View Modal */}
      {showViewModal && selectedLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Leave Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedLeave(null);
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  {selectedLeave.staffName}
                </h3>
                <p className="text-gray-500">
                  Applied on{" "}
                  {new Date(selectedLeave.appliedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Leave Type
                    </label>
                    <p className="font-medium capitalize">
                      {selectedLeave.leaveType}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">
                      Total Days
                    </label>
                    <p className="font-medium">{selectedLeave.totalDays}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-500">
                      Duration
                    </label>
                    <p className="font-medium">
                      {new Date(selectedLeave.startDate).toLocaleDateString()} -{" "}
                      {new Date(selectedLeave.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedLeave.reason && (
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-500">
                        Reason
                      </label>
                      <p className="text-gray-700">{selectedLeave.reason}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {selectedLeave.status === "pending" ? (
              <div className="p-4 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    openApproveModal(selectedLeave);
                  }}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    openRejectModal(selectedLeave);
                  }}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Reject
                </button>
              </div>
            ) : (
              <div className="p-4 border-t border-gray-200">
                {selectedLeave.remarks && (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Admin Remarks:</span>{" "}
                    {selectedLeave.remarks}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Approve Leave</h2>
            <p className="text-gray-600 mb-4">
              Approve leave for <strong>{selectedLeave.staffName}</strong> from{" "}
              {new Date(selectedLeave.startDate).toLocaleDateString()} to{" "}
              {new Date(selectedLeave.endDate).toLocaleDateString()} (
              {selectedLeave.totalDays} days)?
            </p>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add remarks (optional)..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedLeave(null);
                  setRemarks("");
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveLeave}
                disabled={saving}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-70 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Approving..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Reject Leave</h2>
            <p className="text-gray-600 mb-4">
              Reject leave for <strong>{selectedLeave.staffName}</strong>?
            </p>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Reason for rejection..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedLeave(null);
                  setRemarks("");
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectLeave}
                disabled={saving}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-70 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
