"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import {
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function StudentLeavePage() {
  const [role, setRole] = useState<Role>("student");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");

  const leaveRequests = [
    {
      id: 1,
      type: "Sick Leave",
      fromDate: "Jan 15, 2026",
      toDate: "Jan 16, 2026",
      reason: "Fever",
      status: "approved",
    },
    {
      id: 2,
      type: "Personal Leave",
      fromDate: "Jan 10, 2026",
      toDate: "Jan 10, 2026",
      reason: "Family function",
      status: "pending",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Leave request submitted successfully!");
    setLeaveType("");
    setReason("");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Leave Request</h1>
          <p className="text-gray-500 mt-1">Apply for leave</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Apply for Leave</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Type
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="form-select w-full"
                  required
                >
                  <option value="">Select leave type</option>
                  <option value="sick">Sick Leave</option>
                  <option value="personal">Personal Leave</option>
                  <option value="emergency">Emergency Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Date
                  </label>
                  <input type="date" className="form-input w-full" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Date
                  </label>
                  <input type="date" className="form-input w-full" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="form-textarea w-full"
                  rows={3}
                  placeholder="Enter reason for leave..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Submit Request
              </button>
            </form>
          </div>

          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">My Leave Requests</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {leaveRequests.map((request) => (
                <div key={request.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {request.type}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3" />
                        {request.fromDate} - {request.toDate}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {request.reason}
                      </p>
                    </div>
                    <span
                      className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                        request.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : request.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {request.status === "approved" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : request.status === "pending" ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
