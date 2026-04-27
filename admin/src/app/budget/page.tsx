"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Wallet,
  Receipt,
  DollarSign,
  TrendingUp,
  Eye,
  Edit2,
  Trash2,
  X,
  PieChart,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface Budget {
  id: string;
  academicYear: string;
  category?: string;
  department?: string;
  budgetedAmount: number;
  spentAmount: number;
  status: string;
}

interface Expense {
  id: string;
  expenseDate: string;
  category: string;
  description?: string;
  amount: number;
  paymentMode?: string;
  vendor?: string;
  invoiceNumber?: string;
  status: string;
}

interface FormData {
  academicYear: string;
  category: string;
  department: string;
  budgetedAmount: string;
  spentAmount: string;
  status: string;
}

interface ExpenseFormData {
  expenseDate: string;
  category: string;
  description: string;
  amount: string;
  paymentMode: string;
  vendor: string;
  invoiceNumber: string;
  status: string;
}

const EXPENSE_CATEGORIES = [
  { value: "salary", label: "Salary", color: "bg-red-100 text-red-700" },
  {
    value: "maintenance",
    label: "Maintenance",
    color: "bg-orange-100 text-orange-700",
  },
  {
    value: "supplies",
    label: "Supplies",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    value: "utilities",
    label: "Utilities",
    color: "bg-green-100 text-green-700",
  },
  {
    value: "transport",
    label: "Transport",
    color: "bg-blue-100 text-blue-700",
  },
  { value: "events", label: "Events", color: "bg-purple-100 text-purple-700" },
  { value: "admin", label: "Admin", color: "bg-indigo-100 text-indigo-700" },
  { value: "other", label: "Other", color: "bg-gray-100 text-gray-700" },
];

const PAYMENT_MODES = [
  { value: "cash", label: "Cash" },
  { value: "bank", label: "Bank Transfer" },
  { value: "upi", label: "UPI" },
  { value: "cheque", label: "Cheque" },
];

const BUDGET_STATUSES = [
  { value: "draft", label: "Draft", color: "bg-gray-100 text-gray-700" },
  { value: "approved", label: "Approved", color: "bg-blue-100 text-blue-700" },
  { value: "active", label: "Active", color: "bg-green-100 text-green-700" },
  { value: "closed", label: "Closed", color: "bg-red-100 text-red-700" },
];

const EXPENSE_STATUSES = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
  },
  { value: "approved", label: "Approved", color: "bg-blue-100 text-blue-700" },
  { value: "paid", label: "Paid", color: "bg-green-100 text-green-700" },
];

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState("budget");
  const [loading, setLoading] = useState(true);

  // Budget state
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budgetSummary, setBudgetSummary] = useState({
    totalBudgeted: 0,
    totalSpent: 0,
    remaining: 0,
  });
  const [filterYear, setFilterYear] = useState("");

  // Expense state
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseSummary, setExpenseSummary] = useState({
    totalExpenses: 0,
    count: 0,
  });
  const [filterCategory, setFilterCategory] = useState("");

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Budget | Expense | null>(
    null,
  );
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    academicYear: new Date().getFullYear().toString(),
    category: "",
    department: "",
    budgetedAmount: "",
    spentAmount: "0",
    status: "draft",
  });

  const [expenseFormData, setExpenseFormData] = useState<ExpenseFormData>({
    expenseDate: new Date().toISOString().split("T")[0],
    category: "",
    description: "",
    amount: "",
    paymentMode: "",
    vendor: "",
    invoiceNumber: "",
    status: "pending",
  });

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  async function fetchBudgets() {
    try {
      const params = new URLSearchParams();
      if (filterYear) params.set("academicYear", filterYear);

      const res = await fetch(`${API_URL}/api/budgets?${params}`);
      if (res.ok) {
        const data = await res.json();
        setBudgets(data.budgets || []);
        setBudgetSummary(
          data.summary || { totalBudgeted: 0, totalSpent: 0, remaining: 0 },
        );
      }
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchExpenses() {
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set("category", filterCategory);

      const res = await fetch(`${API_URL}/api/expenses?${params}`);
      if (res.ok) {
        const data = await res.json();
        setExpenses(data.expenses || []);
        setExpenseSummary(data.summary || { totalExpenses: 0, count: 0 });
      }
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    } finally {
      setLoading(false);
    }
  }

  function validateBudgetForm(): boolean {
    if (!formData.academicYear) {
      alert("Academic year is required");
      return false;
    }
    if (!formData.budgetedAmount || isNaN(Number(formData.budgetedAmount))) {
      alert("Valid budget amount is required");
      return false;
    }
    return true;
  }

  function validateExpenseForm(): boolean {
    if (!expenseFormData.expenseDate) {
      alert("Expense date is required");
      return false;
    }
    if (!expenseFormData.category) {
      alert("Category is required");
      return false;
    }
    if (!expenseFormData.amount || isNaN(Number(expenseFormData.amount))) {
      alert("Valid amount is required");
      return false;
    }
    return true;
  }

  async function handleAddBudget() {
    if (!validateBudgetForm()) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/budgets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          academicYear: formData.academicYear,
          category: formData.category,
          department: formData.department,
          budgetedAmount: Number(formData.budgetedAmount),
        }),
      });

      if (res.ok) {
        alert("Success: Budget created");
        setShowAddModal(false);
        resetForm();
        fetchBudgets();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create budget");
      }
    } catch (error) {
      alert("Failed to create budget");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateBudget() {
    if (!selectedItem || !validateBudgetForm()) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/budgets`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedItem.id,
          budgetedAmount: Number(formData.budgetedAmount),
          spentAmount: Number(formData.spentAmount) || 0,
          status: formData.status,
        }),
      });

      if (res.ok) {
        alert("Success: Budget updated");
        setShowEditModal(false);
        resetForm();
        fetchBudgets();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update budget");
      }
    } catch (error) {
      alert("Failed to update budget");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteBudget() {
    if (!selectedItem) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/budgets?id=${selectedItem.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Success: Budget deleted");
        setShowDeleteModal(false);
        setSelectedItem(null);
        fetchBudgets();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete budget");
      }
    } catch (error) {
      alert("Failed to delete budget");
    } finally {
      setSaving(false);
    }
  }

  async function handleAddExpense() {
    if (!validateExpenseForm()) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expenseDate: expenseFormData.expenseDate,
          category: expenseFormData.category,
          description: expenseFormData.description,
          amount: Number(expenseFormData.amount),
          paymentMode: expenseFormData.paymentMode || undefined,
          vendor: expenseFormData.vendor || undefined,
          invoiceNumber: expenseFormData.invoiceNumber || undefined,
        }),
      });

      if (res.ok) {
        alert("Success: Expense recorded");
        setShowAddModal(false);
        resetExpenseForm();
        fetchExpenses();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add expense");
      }
    } catch (error) {
      alert("Failed to add expense");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateExpense() {
    if (!selectedItem || !validateExpenseForm()) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedItem.id,
          expenseDate: expenseFormData.expenseDate,
          category: expenseFormData.category,
          description: expenseFormData.description,
          amount: Number(expenseFormData.amount),
          paymentMode: expenseFormData.paymentMode || undefined,
          vendor: expenseFormData.vendor || undefined,
          invoiceNumber: expenseFormData.invoiceNumber || undefined,
          status: expenseFormData.status,
        }),
      });

      if (res.ok) {
        alert("Success: Expense updated");
        setShowEditModal(false);
        resetExpenseForm();
        fetchExpenses();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update expense");
      }
    } catch (error) {
      alert("Failed to update expense");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteExpense() {
    if (!selectedItem) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/expenses?id=${selectedItem.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Success: Expense deleted");
        setShowDeleteModal(false);
        setSelectedItem(null);
        fetchExpenses();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete expense");
      }
    } catch (error) {
      alert("Failed to delete expense");
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setFormData({
      academicYear: new Date().getFullYear().toString(),
      category: "",
      department: "",
      budgetedAmount: "",
      spentAmount: "0",
      status: "draft",
    });
  }

  function resetExpenseForm() {
    setExpenseFormData({
      expenseDate: new Date().toISOString().split("T")[0],
      category: "",
      description: "",
      amount: "",
      paymentMode: "",
      vendor: "",
      invoiceNumber: "",
      status: "pending",
    });
  }

  function openEditModal(item: Budget | Expense, type: "budget" | "expense") {
    setSelectedItem(item);
    if (type === "budget") {
      const budget = item as Budget;
      setFormData({
        academicYear: budget.academicYear,
        category: budget.category || "",
        department: budget.department || "",
        budgetedAmount: budget.budgetedAmount.toString(),
        spentAmount: budget.spentAmount.toString(),
        status: budget.status,
      });
    } else {
      const expense = item as Expense;
      setExpenseFormData({
        expenseDate: new Date(expense.expenseDate).toISOString().split("T")[0],
        category: expense.category,
        description: expense.description || "",
        amount: expense.amount.toString(),
        paymentMode: expense.paymentMode || "",
        vendor: expense.vendor || "",
        invoiceNumber: expense.invoiceNumber || "",
        status: expense.status,
      });
    }
    setShowEditModal(true);
  }

  function openDeleteConfirm(item: Budget | Expense) {
    setSelectedItem(item);
    setShowDeleteModal(true);
  }

  function openViewModal(item: Budget | Expense, type: "budget" | "expense") {
    setSelectedItem(item);
    setShowViewModal(true);
  }

  const getCategoryBadge = (category: string) => {
    const cat = EXPENSE_CATEGORIES.find((c) => c.value === category);
    return cat ? (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${cat.color}`}
      >
        {cat.label}
      </span>
    ) : (
      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
        {category}
      </span>
    );
  };

  const getStatusBadge = (status: string, type: "budget" | "expense") => {
    const statuses = type === "budget" ? BUDGET_STATUSES : EXPENSE_STATUSES;
    const stat = statuses.find((s) => s.value === status);
    return stat ? (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${stat.color}`}
      >
        {stat.label}
      </span>
    ) : (
      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
        {status}
      </span>
    );
  };

  const tabs = [
    { id: "budget", label: "Budget", icon: Wallet },
    { id: "expense", label: "Expenses", icon: Receipt },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Budget & Expenses
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {activeTab === "budget" ? "Add Budget" : "Add Expense"}
          </button>
        </header>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Sidebar Tabs */}
          <div className="w-56 bg-white border-r border-gray-200 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-6xl">
              {activeTab === "budget" && (
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                    <input
                      type="text"
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                      placeholder="Academic Year (e.g., 2026)"
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-40"
                    />
                    <button
                      onClick={fetchBudgets}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                    >
                      Filter
                    </button>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Total Budgeted
                          </p>
                          <p className="text-2xl font-bold text-gray-800">
                            ₹{budgetSummary.totalBudgeted.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-xl">
                          <Wallet className="w-6 h-6 text-indigo-600" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Spent</p>
                          <p className="text-2xl font-bold text-orange-600">
                            ₹{budgetSummary.totalSpent.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-xl">
                          <TrendingUp className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Remaining</p>
                          <p className="text-2xl font-bold text-green-600">
                            ₹{budgetSummary.remaining.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl">
                          <PieChart className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Budget List */}
                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Academic Year
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Category
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              Budgeted
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              Spent
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              Remaining
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {budgets.length === 0 ? (
                            <tr>
                              <td
                                colSpan={7}
                                className="px-4 py-12 text-center text-gray-500"
                              >
                                No budgets found
                              </td>
                            </tr>
                          ) : (
                            budgets.map((budget) => (
                              <tr key={budget.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-800">
                                  {budget.academicYear}
                                </td>
                                <td className="px-4 py-3 text-gray-600">
                                  {budget.category || "-"}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-600">
                                  ₹{budget.budgetedAmount.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-right text-orange-600 font-medium">
                                  ₹{budget.spentAmount.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-right text-green-600 font-medium">
                                  ₹
                                  {(
                                    budget.budgetedAmount - budget.spentAmount
                                  ).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {getStatusBadge(budget.status, "budget")}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() =>
                                        openViewModal(budget, "budget")
                                      }
                                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        openEditModal(budget, "budget")
                                      }
                                      className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => openDeleteConfirm(budget)}
                                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "expense" && (
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      <option value="">All Categories</option>
                      {EXPENSE_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={fetchExpenses}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                    >
                      Filter
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Total Expenses
                          </p>
                          <p className="text-2xl font-bold text-gray-800">
                            ₹{expenseSummary.totalExpenses.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-xl">
                          <DollarSign className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Total Transactions
                          </p>
                          <p className="text-2xl font-bold text-gray-800">
                            {expenseSummary.count}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl">
                          <Receipt className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expense List */}
                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Category
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Description
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Vendor
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {expenses.length === 0 ? (
                            <tr>
                              <td
                                colSpan={7}
                                className="px-4 py-12 text-center text-gray-500"
                              >
                                No expenses found
                              </td>
                            </tr>
                          ) : (
                            expenses.map((expense) => (
                              <tr key={expense.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-800">
                                  {new Date(
                                    expense.expenseDate,
                                  ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </td>
                                <td className="px-4 py-3">
                                  {getCategoryBadge(expense.category)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {expense.description || "-"}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-800 font-medium">
                                  ₹{expense.amount.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {expense.vendor || "-"}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {getStatusBadge(expense.status, "expense")}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() =>
                                        openViewModal(expense, "expense")
                                      }
                                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        openEditModal(expense, "expense")
                                      }
                                      className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => openDeleteConfirm(expense)}
                                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Budget Modal */}
      {(showAddModal || showEditModal) && activeTab === "budget" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-white rounded-t-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">
                {showEditModal ? "Edit Budget" : "Add Budget"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  resetForm();
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year *
                </label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) =>
                    setFormData({ ...formData, academicYear: e.target.value })
                  }
                  placeholder="e.g., 2026"
                  disabled={showEditModal}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option value="">Select category</option>
                  <option value="salary">Salary</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="supplies">Supplies</option>
                  <option value="utilities">Utilities</option>
                  <option value="transport">Transport</option>
                  <option value="events">Events</option>
                  <option value="admin">Admin</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budgeted Amount (₹) *
                </label>
                <input
                  type="number"
                  value={formData.budgetedAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetedAmount: e.target.value })
                  }
                  placeholder="e.g., 500000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              {showEditModal && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Spent Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.spentAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          spentAmount: e.target.value,
                        })
                      }
                      placeholder="e.g., 100000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      {BUDGET_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={showEditModal ? handleUpdateBudget : handleAddBudget}
                disabled={saving}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-70"
              >
                {saving
                  ? "Saving..."
                  : showEditModal
                    ? "Update Budget"
                    : "Create Budget"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Expense Modal */}
      {(showAddModal || showEditModal) && activeTab === "expense" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-white rounded-t-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">
                {showEditModal ? "Edit Expense" : "Add Expense"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  resetExpenseForm();
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={expenseFormData.expenseDate}
                  onChange={(e) =>
                    setExpenseFormData({
                      ...expenseFormData,
                      expenseDate: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={expenseFormData.category}
                  onChange={(e) =>
                    setExpenseFormData({
                      ...expenseFormData,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option value="">Select category</option>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  value={expenseFormData.amount}
                  onChange={(e) =>
                    setExpenseFormData({
                      ...expenseFormData,
                      amount: e.target.value,
                    })
                  }
                  placeholder="e.g., 5000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={expenseFormData.description}
                  onChange={(e) =>
                    setExpenseFormData({
                      ...expenseFormData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter description"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor
                </label>
                <input
                  type="text"
                  value={expenseFormData.vendor}
                  onChange={(e) =>
                    setExpenseFormData({
                      ...expenseFormData,
                      vendor: e.target.value,
                    })
                  }
                  placeholder="Enter vendor name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={expenseFormData.paymentMode}
                    onChange={(e) =>
                      setExpenseFormData({
                        ...expenseFormData,
                        paymentMode: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="">Select</option>
                    {PAYMENT_MODES.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice #
                  </label>
                  <input
                    type="text"
                    value={expenseFormData.invoiceNumber}
                    onChange={(e) =>
                      setExpenseFormData({
                        ...expenseFormData,
                        invoiceNumber: e.target.value,
                      })
                    }
                    placeholder="INV-001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
              {showEditModal && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={expenseFormData.status}
                    onChange={(e) =>
                      setExpenseFormData({
                        ...expenseFormData,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    {EXPENSE_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={showEditModal ? handleUpdateExpense : handleAddExpense}
                disabled={saving}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-70"
              >
                {saving
                  ? "Saving..."
                  : showEditModal
                    ? "Update Expense"
                    : "Add Expense"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-white rounded-t-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">
                {activeTab === "budget" ? "Budget Details" : "Expense Details"}
              </h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {"academicYear" in selectedItem ? (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Academic Year</span>
                    <span className="font-medium">
                      {selectedItem.academicYear}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">
                      {selectedItem.category || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budgeted</span>
                    <span className="font-medium text-indigo-600">
                      ₹{selectedItem.budgetedAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spent</span>
                    <span className="font-medium text-orange-600">
                      ₹{selectedItem.spentAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining</span>
                    <span className="font-medium text-green-600">
                      ₹
                      {(
                        selectedItem.budgetedAmount - selectedItem.spentAmount
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    {getStatusBadge(selectedItem.status, "budget")}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">
                      {new Date(selectedItem.expenseDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    {getCategoryBadge(selectedItem.category)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-medium text-indigo-600">
                      ₹{selectedItem.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description</span>
                    <span className="font-medium">
                      {selectedItem.description || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vendor</span>
                    <span className="font-medium">
                      {selectedItem.vendor || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Mode</span>
                    <span className="font-medium">
                      {selectedItem.paymentMode || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice</span>
                    <span className="font-medium">
                      {selectedItem.invoiceNumber || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    {getStatusBadge(selectedItem.status, "expense")}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(
                    selectedItem,
                    activeTab as "budget" | "expense",
                  );
                }}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openDeleteConfirm(selectedItem);
                }}
                className="py-3 px-6 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-white rounded-t-2xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete {activeTab === "budget" ? "Budget" : "Expense"}?
              </h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    activeTab === "budget"
                      ? handleDeleteBudget
                      : handleDeleteExpense
                  }
                  disabled={saving}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-70"
                >
                  {saving ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
