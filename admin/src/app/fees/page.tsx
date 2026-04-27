"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  X,
  Loader2,
  DollarSign,
  Calendar,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface FeeStructure {
  id: string;
  classId?: string;
  className?: string;
  academicYear?: string;
  totalFee: number;
  tuitionFee?: number;
  transportFee?: number;
  libraryFee?: number;
  examFee?: number;
  otherFee?: number;
  dueDate?: string;
}

interface ClassData {
  id: string;
  name: string;
  section?: string;
}

interface FormData {
  classId: string;
  academicYear: string;
  totalFee: string;
  tuitionFee: string;
  transportFee: string;
  libraryFee: string;
  examFee: string;
  otherFee: string;
  dueDate: string;
}

const initialFormData: FormData = {
  classId: "",
  academicYear: new Date().getFullYear().toString(),
  totalFee: "",
  tuitionFee: "",
  transportFee: "",
  libraryFee: "",
  examFee: "",
  otherFee: "",
  dueDate: "",
};

export default function FeesPage() {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchFeeStructures();
    fetchClasses();
  }, [filterYear]);

  async function fetchFeeStructures() {
    try {
      let url = `${API_URL}/api/fees`;
      const params = new URLSearchParams();
      if (filterYear) params.append("academicYear", filterYear);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setFeeStructures(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch fee structures:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchClasses() {
    try {
      const res = await fetch(`${API_URL}/api/classes`);
      if (res.ok) {
        const data = await res.json();
        setClasses(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch classes:", err);
    }
  }

  const filteredFees = feeStructures.filter(
    (f) =>
      f.className?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.academicYear?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.classId) {
      newErrors.classId = "Class is required";
    }
    if (!formData.academicYear) {
      newErrors.academicYear = "Academic year is required";
    }
    if (!formData.totalFee || parseFloat(formData.totalFee) <= 0) {
      newErrors.totalFee = "Total fee is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleAddFee() {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const payload = {
        classId: formData.classId,
        academicYear: formData.academicYear,
        totalFee: parseFloat(formData.totalFee),
        tuitionFee: formData.tuitionFee ? parseFloat(formData.tuitionFee) : 0,
        transportFee: formData.transportFee
          ? parseFloat(formData.transportFee)
          : 0,
        libraryFee: formData.libraryFee ? parseFloat(formData.libraryFee) : 0,
        examFee: formData.examFee ? parseFloat(formData.examFee) : 0,
        otherFee: formData.otherFee ? parseFloat(formData.otherFee) : 0,
        dueDate: formData.dueDate || undefined,
      };

      const res = await fetch(`${API_URL}/api/fees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Fee structure created successfully!");
        setShowAddModal(false);
        setFormData(initialFormData);
        fetchFeeStructures();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create fee structure");
      }
    } catch (error) {
      alert("Failed to create fee structure");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateFee() {
    if (!validateForm() || !selectedFee) return;

    setSaving(true);
    try {
      const payload = {
        id: selectedFee.id,
        totalFee: parseFloat(formData.totalFee),
        tuitionFee: formData.tuitionFee ? parseFloat(formData.tuitionFee) : 0,
        transportFee: formData.transportFee
          ? parseFloat(formData.transportFee)
          : 0,
        libraryFee: formData.libraryFee ? parseFloat(formData.libraryFee) : 0,
        examFee: formData.examFee ? parseFloat(formData.examFee) : 0,
        otherFee: formData.otherFee ? parseFloat(formData.otherFee) : 0,
        dueDate: formData.dueDate || undefined,
      };

      const res = await fetch(`${API_URL}/api/fees`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Fee structure updated successfully!");
        setShowEditModal(false);
        setSelectedFee(null);
        fetchFeeStructures();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update fee structure");
      }
    } catch (error) {
      alert("Failed to update fee structure");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteFee() {
    if (!selectedFee) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/fees?id=${selectedFee.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Fee structure deleted successfully!");
        setShowDeleteConfirm(false);
        setSelectedFee(null);
        fetchFeeStructures();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete fee structure");
      }
    } catch (error) {
      alert("Failed to delete fee structure");
    } finally {
      setSaving(false);
    }
  }

  function openViewModal(fee: FeeStructure) {
    setSelectedFee(fee);
    setShowViewModal(true);
  }

  function openEditModal(fee: FeeStructure) {
    setSelectedFee(fee);
    setFormData({
      classId: fee.classId || "",
      academicYear: fee.academicYear || new Date().getFullYear().toString(),
      totalFee: fee.totalFee?.toString() || "",
      tuitionFee: fee.tuitionFee?.toString() || "",
      transportFee: fee.transportFee?.toString() || "",
      libraryFee: fee.libraryFee?.toString() || "",
      examFee: fee.examFee?.toString() || "",
      otherFee: fee.otherFee?.toString() || "",
      dueDate: fee.dueDate?.split("T")[0] || "",
    });
    setShowEditModal(true);
  }

  function openDeleteConfirm(fee: FeeStructure) {
    setSelectedFee(fee);
    setShowDeleteConfirm(true);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Fees Management
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search fee structures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64"
              />
            </div>
            <button
              onClick={() => {
                setFormData({
                  ...initialFormData,
                  academicYear:
                    filterYear || new Date().getFullYear().toString(),
                });
                setErrors({});
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Fee Structure
            </button>
          </div>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFees.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No fee structures found
                </div>
              ) : (
                filteredFees.map((fee) => (
                  <div
                    key={fee.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {fee.className || "All Classes"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {fee.academicYear}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xl font-bold text-indigo-600">
                          <DollarSign className="w-5 h-5" />
                          {fee.totalFee?.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {fee.dueDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Due: {new Date(fee.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                      {fee.tuitionFee ? (
                        <div className="flex justify-between">
                          <span>Tuition:</span>
                          <span>₹{fee.tuitionFee}</span>
                        </div>
                      ) : null}
                      {fee.transportFee ? (
                        <div className="flex justify-between">
                          <span>Transport:</span>
                          <span>₹{fee.transportFee}</span>
                        </div>
                      ) : null}
                      {fee.libraryFee ? (
                        <div className="flex justify-between">
                          <span>Library:</span>
                          <span>₹{fee.libraryFee}</span>
                        </div>
                      ) : null}
                      {fee.examFee ? (
                        <div className="flex justify-between">
                          <span>Exam:</span>
                          <span>₹{fee.examFee}</span>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => openViewModal(fee)}
                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => openEditModal(fee)}
                        className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(fee)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                {showEditModal ? "Edit Fee Structure" : "Create Fee Structure"}
              </h2>
              <button
                onClick={() => {
                  if (showAddModal) setShowAddModal(false);
                  if (showEditModal) setShowEditModal(false);
                  setSelectedFee(null);
                  setErrors({});
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class *
                </label>
                <select
                  value={formData.classId}
                  onChange={(e) =>
                    setFormData({ ...formData, classId: e.target.value })
                  }
                  disabled={showEditModal}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.classId ? "border-red-500" : "border-gray-300"
                  } ${showEditModal ? "bg-gray-100" : ""}`}
                >
                  <option value="">Select Class (or all classes)</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} {cls.section ? `(${cls.section})` : ""}
                    </option>
                  ))}
                </select>
                {errors.classId && (
                  <p className="text-red-500 text-xs mt-1">{errors.classId}</p>
                )}
              </div>

              {/* Academic Year */}
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
                  disabled={showEditModal}
                  placeholder="2026"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.academicYear ? "border-red-500" : "border-gray-300"
                  } ${showEditModal ? "bg-gray-100" : ""}`}
                />
                {errors.academicYear && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.academicYear}
                  </p>
                )}
              </div>

              {/* Total Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Fee (₹) *
                </label>
                <input
                  type="number"
                  value={formData.totalFee}
                  onChange={(e) =>
                    setFormData({ ...formData, totalFee: e.target.value })
                  }
                  placeholder="50000"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.totalFee ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.totalFee && (
                  <p className="text-red-500 text-xs mt-1">{errors.totalFee}</p>
                )}
              </div>

              {/* Fee Components */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tuition Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.tuitionFee}
                    onChange={(e) =>
                      setFormData({ ...formData, tuitionFee: e.target.value })
                    }
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transport Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.transportFee}
                    onChange={(e) =>
                      setFormData({ ...formData, transportFee: e.target.value })
                    }
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Library Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.libraryFee}
                    onChange={(e) =>
                      setFormData({ ...formData, libraryFee: e.target.value })
                    }
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.examFee}
                    onChange={(e) =>
                      setFormData({ ...formData, examFee: e.target.value })
                    }
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Other Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Fee (₹)
                </label>
                <input
                  type="number"
                  value={formData.otherFee}
                  onChange={(e) =>
                    setFormData({ ...formData, otherFee: e.target.value })
                  }
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (showAddModal) setShowAddModal(false);
                  if (showEditModal) setShowEditModal(false);
                  setSelectedFee(null);
                  setErrors({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showEditModal ? handleUpdateFee : handleAddFee}
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving
                  ? "Saving..."
                  : showEditModal
                    ? "Update Fee Structure"
                    : "Create Fee Structure"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Fee Structure Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedFee(null);
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  {selectedFee.className || "All Classes"}
                </h3>
                <p className="text-gray-500">{selectedFee.academicYear}</p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Total Fee
                </label>
                <p className="text-3xl font-bold text-indigo-600">
                  ₹{selectedFee.totalFee?.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-500">
                    Tuition Fee
                  </label>
                  <p className="font-medium">₹{selectedFee.tuitionFee || 0}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-500">
                    Transport Fee
                  </label>
                  <p className="font-medium">
                    ₹{selectedFee.transportFee || 0}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-500">
                    Library Fee
                  </label>
                  <p className="font-medium">₹{selectedFee.libraryFee || 0}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-500">
                    Exam Fee
                  </label>
                  <p className="font-medium">₹{selectedFee.examFee || 0}</p>
                </div>
              </div>

              {selectedFee.otherFee > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-500">
                    Other Fee
                  </label>
                  <p className="font-medium">₹{selectedFee.otherFee}</p>
                </div>
              )}

              {selectedFee.dueDate && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-500">
                    Due Date
                  </label>
                  <p className="font-medium">
                    {new Date(selectedFee.dueDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedFee);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setShowDeleteConfirm(true);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold mb-2">
                Delete Fee Structure
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the fee structure for{" "}
                <strong>{selectedFee.className}</strong> (
                {selectedFee.academicYear})? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedFee(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteFee}
                  disabled={saving}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-70 transition-colors flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
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
