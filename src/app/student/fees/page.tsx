"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import {
  DollarSign,
  CreditCard,
  Receipt,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Menu,
} from "lucide-react";

const feeHistory = [
  {
    id: 1,
    month: "January 2026",
    amount: 15000,
    status: "paid",
    date: "Jan 5, 2026",
  },
  {
    id: 2,
    month: "December 2025",
    amount: 15000,
    status: "paid",
    date: "Dec 3, 2025",
  },
  {
    id: 3,
    month: "November 2025",
    amount: 15000,
    status: "paid",
    date: "Nov 6, 2025",
  },
];

const pendingDues = [
  {
    id: 1,
    description: "Tuition Fee - February 2026",
    amount: 15000,
    dueDate: "Feb 5, 2026",
  },
  { id: 2, description: "Lab Charges", amount: 2500, dueDate: "Feb 10, 2026" },
];

export default function StudentFeesPage() {
  const [role, setRole] = useState<Role>("student");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalPaid = feeHistory.reduce((sum, f) => sum + f.amount, 0);
  const totalPending = pendingDues.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role={role} onRoleChange={setRole} />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900">Fees</h1>
        </div>
        <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          S
        </div>
      </header>

      <main className="pt-16 lg:pt-0 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 hidden lg:block">
              My Fees
            </h1>
            <p className="text-gray-500">
              View fee details and payment history
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Paid</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{totalPaid.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{totalPending.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pay Now Button */}
          <div className="card p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Outstanding Dues
                </h3>
                <p className="text-gray-500">Total pending amount</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{totalPending.toLocaleString()}
                </span>
                <button className="btn btn-primary">Pay Now</button>
              </div>
            </div>
          </div>

          {/* Pending Dues */}
          <div className="card overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Pending Dues</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {pendingDues.map((due) => (
                <div
                  key={due.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {due.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due: {due.dueDate}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₹{due.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Payment History</h2>
              <button className="btn btn-secondary text-sm flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Month
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {feeHistory.map((fee) => (
                    <tr key={fee.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {fee.month}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        ₹{fee.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          Paid
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {fee.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
