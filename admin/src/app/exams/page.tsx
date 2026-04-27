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
  Calendar,
  Clock,
  FileText,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface Exam {
  id: string;
  name: string;
  examType: string;
  className?: string;
  classId?: string;
  academicYear?: string;
  startDate?: string;
  endDate?: string;
  status: string;
  schedules?: ExamSchedule[];
}

interface ExamSchedule {
  id: string;
  subject?: string;
  subjectId?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  maxMarks?: number;
  roomNumber?: string;
}

interface ClassData {
  id: string;
  name: string;
  section?: string;
}

interface FormData {
  name: string;
  examType: string;
  classId: string;
  academicYear: string;
  startDate: string;
  endDate: string;
}

const initialFormData: FormData = {
  name: "",
  examType: "unit",
  classId: "",
  academicYear: new Date().getFullYear().toString(),
  startDate: "",
  endDate: "",
};

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchExams();
    fetchClasses();
  }, []);

  async function fetchExams() {
    try {
      let url = `${API_URL}/api/exams`;
      const params = new URLSearchParams();
      if (filterStatus) params.append("status", filterStatus);
      if (filterClass) params.append("classId", filterClass);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setExams(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch exams:", err);
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

  const filteredExams = exams.filter(
    (e) =>
      e.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.examType?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Exam name is required";
    }
    if (!formData.examType) {
      newErrors.examType = "Exam type is required";
    }
    if (!formData.classId) {
      newErrors.classId = "Class is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleAddExam() {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/exams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Exam created successfully!");
        setShowAddModal(false);
        setFormData(initialFormData);
        fetchExams();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create exam");
      }
    } catch (error) {
      alert("Failed to create exam");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateExam() {
    if (!validateForm() || !selectedExam) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/exams`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedExam.id,
          ...formData,
        }),
      });

      if (res.ok) {
        alert("Exam updated successfully!");
        setShowEditModal(false);
        setSelectedExam(null);
        fetchExams();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update exam");
      }
    } catch (error) {
      alert("Failed to update exam");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteExam() {
    if (!selectedExam) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/exams?id=${selectedExam.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Exam deleted successfully!");
        setShowDeleteConfirm(false);
        setSelectedExam(null);
        fetchExams();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete exam");
      }
    } catch (error) {
      alert("Failed to delete exam");
    } finally {
      setSaving(false);
    }
  }

  function openViewModal(exam: Exam) {
    setSelectedExam(exam);
    setShowViewModal(true);
  }

  function openEditModal(exam: Exam) {
    setSelectedExam(exam);
    setFormData({
      name: exam.name || "",
      examType: exam.examType || "unit",
      classId: exam.classId || "",
      academicYear: exam.academicYear || new Date().getFullYear().toString(),
      startDate: exam.startDate?.split("T")[0] || "",
      endDate: exam.endDate?.split("T")[0] || "",
    });
    setShowEditModal(true);
  }

  function openDeleteConfirm(exam: Exam) {
    setSelectedExam(exam);
    setShowDeleteConfirm(true);
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      scheduled: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-700"}`}
      >
        {status || "scheduled"}
      </span>
    );
  };

  const getExamTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      unit: "Unit Test",
      "mid-term": "Mid Term",
      final: "Final",
      annual: "Annual",
      periodic: "Periodic",
    };
    return labels[type] || type;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Exams Management
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={filterClass}
              onChange={(e) => {
                setFilterClass(e.target.value);
                fetchExams();
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                fetchExams();
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64"
              />
            </div>
            <button
              onClick={() => {
                setFormData({
                  ...initialFormData,
                  academicYear: new Date().getFullYear().toString(),
                });
                setErrors({});
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Exam
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
              {filteredExams.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No exams found
                </div>
              ) : (
                filteredExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {exam.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {getExamTypeBadge(exam.examType)} • {exam.className}
                        </p>
                      </div>
                      {getStatusBadge(exam.status)}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {exam.startDate
                            ? new Date(exam.startDate).toLocaleDateString()
                            : "Not scheduled"}
                          {exam.endDate &&
                            ` - ${new Date(exam.endDate).toLocaleDateString()}`}
                        </span>
                      </div>
                      {exam.schedules && exam.schedules.length > 0 && (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>{exam.schedules.length} subjects</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {exam.academicYear}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => openViewModal(exam)}
                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => openEditModal(exam)}
                        className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(exam)}
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
                {showEditModal ? "Edit Exam" : "Create New Exam"}
              </h2>
              <button
                onClick={() => {
                  if (showAddModal) setShowAddModal(false);
                  if (showEditModal) setShowEditModal(false);
                  setSelectedExam(null);
                  setErrors({});
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Exam Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Unit Test 1"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Exam Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Type *
                </label>
                <select
                  value={formData.examType}
                  onChange={(e) =>
                    setFormData({ ...formData, examType: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.examType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="unit">Unit Test</option>
                  <option value="mid-term">Mid Term</option>
                  <option value="final">Final</option>
                  <option value="annual">Annual</option>
                  <option value="periodic">Periodic</option>
                </select>
                {errors.examType && (
                  <p className="text-red-500 text-xs mt-1">{errors.examType}</p>
                )}
              </div>

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
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.classId ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Class</option>
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
                  Academic Year
                </label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) =>
                    setFormData({ ...formData, academicYear: e.target.value })
                  }
                  placeholder="2026"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
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
                  setSelectedExam(null);
                  setErrors({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showEditModal ? handleUpdateExam : handleAddExam}
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving
                  ? "Saving..."
                  : showEditModal
                    ? "Update Exam"
                    : "Create Exam"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Exam Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedExam(null);
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">{selectedExam.name}</h3>
                <p className="text-gray-500">
                  {getExamTypeBadge(selectedExam.examType)} •{" "}
                  {selectedExam.className}
                </p>
                <div className="mt-2">
                  {getStatusBadge(selectedExam.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase">
                    Academic Year
                  </label>
                  <p className="text-gray-900">
                    {selectedExam.academicYear || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase">
                    Class
                  </label>
                  <p className="text-gray-900">
                    {selectedExam.className || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase">
                    Start Date
                  </label>
                  <p className="text-gray-900">
                    {selectedExam.startDate
                      ? new Date(selectedExam.startDate).toLocaleDateString()
                      : "Not scheduled"}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase">
                    End Date
                  </label>
                  <p className="text-gray-900">
                    {selectedExam.endDate
                      ? new Date(selectedExam.endDate).toLocaleDateString()
                      : "Not scheduled"}
                  </p>
                </div>
              </div>

              {selectedExam.schedules && selectedExam.schedules.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Schedule ({selectedExam.schedules.length} subjects)
                  </h4>
                  <div className="space-y-2">
                    {selectedExam.schedules.map((schedule, idx) => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <span className="font-medium">
                            {schedule.subject}
                          </span>
                          {schedule.roomNumber && (
                            <span className="text-sm text-gray-500 ml-2">
                              Room: {schedule.roomNumber}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {schedule.date &&
                            new Date(schedule.date).toLocaleDateString()}
                          {schedule.startTime && ` ${schedule.startTime}`}
                          {schedule.endTime && ` - ${schedule.endTime}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedExam);
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
      {showDeleteConfirm && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Delete Exam</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedExam.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedExam(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteExam}
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
