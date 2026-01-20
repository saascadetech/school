"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, expenses, complianceItems } from "@/lib/data";
import {
  DollarSign,
  Plus,
  Filter,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExpensesCompliancePage() {
  const [role, setRole] = useState<Role>("principal");
  const [activeTab, setActiveTab] = useState<"expenses" | "compliance">(
    "expenses",
  );

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const paidExpenses = expenses
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = totalExpenses - paidExpenses;

  const expenseByCategory = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const categoryLabels: Record<string, string> = {
    salary: "Salary",
    maintenance: "Maintenance",
    supplies: "Supplies",
    utilities: "Utilities",
    transport: "Transport",
    events: "Events",
    admin: "Administration",
    other: "Other",
  };

  const statusLabels: Record<string, { label: string; class: string }> = {
    pending: { label: "Pending", class: "bg-amber-100 text-amber-700" },
    approved: { label: "Approved", class: "bg-blue-100 text-blue-700" },
    paid: { label: "Paid", class: "bg-green-100 text-green-700" },
  };

  const complianceStatusLabels: Record<
    string,
    { label: string; class: string }
  > = {
    pending: { label: "Pending", class: "bg-amber-100 text-amber-700" },
    in_progress: { label: "In Progress", class: "bg-blue-100 text-blue-700" },
    completed: { label: "Completed", class: "bg-green-100 text-green-700" },
    overdue: { label: "Overdue", class: "bg-red-100 text-red-700" },
  };

  const complianceCategoryLabels: Record<string, string> = {
    affiliation: "Affiliation",
    safety: "Safety",
    financial: "Financial",
    academic: "Academic",
    staff: "Staff",
    student: "Student",
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Expenses & Compliance
            </h1>
            <p className="text-gray-500 mt-1">
              Track expenses and manage compliance requirements
            </p>
          </div>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {activeTab === "expenses" ? "Add Expense" : "Add Compliance Item"}
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("expenses")}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              activeTab === "expenses"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab("compliance")}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              activeTab === "compliance"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            Compliance
          </button>
        </div>

        {activeTab === "expenses" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{(totalExpenses / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Paid</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{(paidExpenses / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">
                      ₹{(pendingExpenses / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Categories</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Object.keys(expenseByCategory).length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Filter className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="card p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Expenses by Category
                </h3>
                <div className="space-y-3">
                  {Object.entries(expenseByCategory).map(
                    ([category, amount]) => (
                      <div key={category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">
                            {categoryLabels[category]}
                          </span>
                          <span className="font-medium">
                            ₹{amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${(amount / totalExpenses) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="card p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Recent Expenses
                </h3>
                <div className="space-y-3">
                  {expenses.slice(0, 5).map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {expense.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(expense.expenseDate).toLocaleDateString()} •{" "}
                          {categoryLabels[expense.category]}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{expense.amount.toLocaleString()}
                        </p>
                        <span
                          className={cn(
                            "text-xs",
                            expense.status === "paid"
                              ? "text-green-600"
                              : "text-amber-600",
                          )}
                        >
                          {statusLabels[expense.status].label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "compliance" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {complianceItems.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {
                        complianceItems.filter((c) => c.status === "completed")
                          .length
                      }
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {
                        complianceItems.filter(
                          (c) => c.status === "in_progress",
                        ).length
                      }
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">
                      {
                        complianceItems.filter((c) => c.status === "overdue")
                          .length
                      }
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Requirement
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Due Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Responsible
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {complianceItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">
                            {item.requirement}
                          </p>
                          {item.notes && (
                            <p className="text-sm text-gray-500 mt-1">
                              {item.notes}
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                            {complianceCategoryLabels[item.category]}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {new Date(item.dueDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-gray-700">
                          {item.responsiblePerson || "-"}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              complianceStatusLabels[item.status].class,
                            )}
                          >
                            {complianceStatusLabels[item.status].label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
