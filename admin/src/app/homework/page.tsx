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
  BookOpen,
  Calendar,
  User,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface Homework {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  subject?: string;
  subjectId?: string;
  classId?: string;
  className?: string;
  teacherName?: string;
  submissionCount?: number;
}

interface ClassData {
  id: string;
  name: string;
  section?: string;
}

interface SubjectData {
  id: string;
  name: string;
}

interface FormData {
  classId: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: string;
}

const initialFormData: FormData = {
  classId: "",
  subjectId: "",
  title: "",
  description: "",
  dueDate: "",
};

export default function HomeworkPage() {
  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(
    null,
  );

  // Form state
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchHomework();
    fetchClasses();
    fetchSubjects();
  }, [filterClass]);

  async function fetchHomework() {
    try {
      let url = `${API_URL}/api/homework`;
      const params = new URLSearchParams();
      if (filterClass) params.append("classId", filterClass);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setHomeworkList(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch homework:", err);
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

  async function fetchSubjects() {
    try {
      const res = await fetch(`${API_URL}/api/subjects`);
      if (res.ok) {
        const data = await res.json();
        setSubjects(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
    }
  }

  const filteredHomework = homeworkList.filter(
    (h) =>
      h.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.className?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.classId) {
      newErrors.classId = "Class is required";
    }
    if (!formData.subjectId) {
      newErrors.subjectId = "Subject is required";
    }
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleAddHomework() {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const payload = {
        classId: formData.classId,
        subjectId: formData.subjectId,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate || undefined,
      };

      const res = await fetch(`${API_URL}/api/homework`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Homework created successfully!");
        setShowAddModal(false);
        setFormData(initialFormData);
        fetchHomework();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create homework");
      }
    } catch (error) {
      alert("Failed to create homework");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateHomework() {
    if (!validateForm() || !selectedHomework) return;

    setSaving(true);
    try {
      const payload = {
        id: selectedHomework.id,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate || null,
      };

      const res = await fetch(`${API_URL}/api/homework`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Homework updated successfully!");
        setShowEditModal(false);
        setSelectedHomework(null);
        fetchHomework();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update homework");
      }
    } catch (error) {
      alert("Failed to update homework");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteHomework() {
    if (!selectedHomework) return;

    setSaving(true);
    try {
      const res = await fetch(
        `${API_URL}/api/homework?id=${selectedHomework.id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        alert("Homework deleted successfully!");
        setShowDeleteConfirm(false);
        setSelectedHomework(null);
        fetchHomework();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete homework");
      }
    } catch (error) {
      alert("Failed to delete homework");
    } finally {
      setSaving(false);
    }
  }

  function openViewModal(homework: Homework) {
    setSelectedHomework(homework);
    setShowViewModal(true);
  }

  function openEditModal(homework: Homework) {
    setSelectedHomework(homework);
    setFormData({
      classId: homework.classId || "",
      subjectId: homework.subjectId || "",
      title: homework.title || "",
      description: homework.description || "",
      dueDate: homework.dueDate?.split("T")[0] || "",
    });
    setShowEditModal(true);
  }

  function openDeleteConfirm(homework: Homework) {
    setSelectedHomework(homework);
    setShowDeleteConfirm(true);
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Homework Management
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search homework..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64"
              />
            </div>
            <button
              onClick={() => {
                setFormData(initialFormData);
                setErrors({});
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Homework
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
              {filteredHomework.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No homework found
                </div>
              ) : (
                filteredHomework.map((homework) => (
                  <div
                    key={homework.id}
                    className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 ${
                      isOverdue(homework.dueDate)
                        ? "border-l-4 border-l-red-400"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {homework.subject}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {homework.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {homework.description || "No description"}
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {homework.dueDate
                            ? `Due: ${new Date(homework.dueDate).toLocaleDateString()}`
                            : "No due date"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4" />
                        <span>{homework.teacherName}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span>{homework.className}</span>
                        {homework.submissionCount !== undefined && (
                          <span className="text-indigo-600">
                            ({homework.submissionCount} submissions)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => openViewModal(homework)}
                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => openEditModal(homework)}
                        className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(homework)}
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
                {showEditModal ? "Edit Homework" : "Create Homework"}
              </h2>
              <button
                onClick={() => {
                  if (showAddModal) setShowAddModal(false);
                  if (showEditModal) setShowEditModal(false);
                  setSelectedHomework(null);
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

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  value={formData.subjectId}
                  onChange={(e) =>
                    setFormData({ ...formData, subjectId: e.target.value })
                  }
                  disabled={showEditModal}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.subjectId ? "border-red-500" : "border-gray-300"
                  } ${showEditModal ? "bg-gray-100" : ""}`}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subj) => (
                    <option key={subj.id} value={subj.id}>
                      {subj.name}
                    </option>
                  ))}
                </select>
                {errors.subjectId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subjectId}
                  </p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter homework title..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter homework description..."
                  rows={4}
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
                  setSelectedHomework(null);
                  setErrors({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={
                  showEditModal ? handleUpdateHomework : handleAddHomework
                }
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving
                  ? "Saving..."
                  : showEditModal
                    ? "Update Homework"
                    : "Create Homework"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedHomework && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Homework Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedHomework(null);
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">
                  {selectedHomework.title}
                </h3>
                <p className="text-gray-500">{selectedHomework.subject}</p>
              </div>

              {selectedHomework.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    Description
                  </label>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedHomework.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Class
                  </label>
                  <p className="text-gray-900">{selectedHomework.className}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Due Date
                  </label>
                  <p className="text-gray-900">
                    {selectedHomework.dueDate
                      ? new Date(selectedHomework.dueDate).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Assigned By
                  </label>
                  <p className="text-gray-900">
                    {selectedHomework.teacherName}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Submissions
                  </label>
                  <p className="text-gray-900">
                    {selectedHomework.submissionCount || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedHomework);
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
      {showDeleteConfirm && selectedHomework && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Delete Homework</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedHomework.title}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedHomework(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteHomework}
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
