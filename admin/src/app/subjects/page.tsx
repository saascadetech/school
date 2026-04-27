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
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface Subject {
  id: string;
  name: string;
  code?: string;
  description?: string;
  subjectClasses?: ClassData[];
  assignments?: TeacherAssignment[];
}

interface ClassData {
  id: string;
  name: string;
}

interface TeacherAssignment {
  id: string;
  teacher?: {
    firstName?: string;
    lastName?: string;
    staff?: {
      employeeId?: string;
    };
  };
}

interface FormData {
  name: string;
  code: string;
  description: string;
}

const initialFormData: FormData = {
  name: "",
  code: "",
  description: "",
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSubjects();
  }, []);

  async function fetchSubjects() {
    try {
      const res = await fetch(`${API_URL}/api/subjects`);
      if (res.ok) {
        const data = await res.json();
        setSubjects(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Subject name is required";
    }
    if (!formData.code.trim()) {
      newErrors.code = "Subject code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleAddSubject() {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/subjects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Subject created successfully!");
        setShowAddModal(false);
        setFormData(initialFormData);
        fetchSubjects();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create subject");
      }
    } catch (error) {
      alert("Failed to create subject");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateSubject() {
    if (!validateForm() || !selectedSubject) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/subjects`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedSubject.id,
          ...formData,
        }),
      });

      if (res.ok) {
        alert("Subject updated successfully!");
        setShowEditModal(false);
        setSelectedSubject(null);
        fetchSubjects();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update subject");
      }
    } catch (error) {
      alert("Failed to update subject");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteSubject() {
    if (!selectedSubject) return;

    setSaving(true);
    try {
      const res = await fetch(
        `${API_URL}/api/subjects?id=${selectedSubject.id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        alert("Subject deleted successfully!");
        setShowDeleteConfirm(false);
        setSelectedSubject(null);
        fetchSubjects();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete subject");
      }
    } catch (error) {
      alert("Failed to delete subject");
    } finally {
      setSaving(false);
    }
  }

  function openViewModal(subject: Subject) {
    setSelectedSubject(subject);
    setShowViewModal(true);
  }

  function openEditModal(subject: Subject) {
    setSelectedSubject(subject);
    setFormData({
      name: subject.name || "",
      code: subject.code || "",
      description: subject.description || "",
    });
    setShowEditModal(true);
  }

  function openDeleteConfirm(subject: Subject) {
    setSelectedSubject(subject);
    setShowDeleteConfirm(true);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Subjects Management
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search subjects..."
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
              Add Subject
            </button>
          </div>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredSubjects.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No subjects found
                </div>
              ) : (
                filteredSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {subject.code}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {subject.name}
                    </h3>
                    {subject.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {subject.description}
                      </p>
                    )}
                    <div className="text-sm text-gray-500 mb-4">
                      {subject.subjectClasses &&
                        subject.subjectClasses.length > 0 && (
                          <span className="mr-3">
                            {subject.subjectClasses.length} class(es)
                          </span>
                        )}
                      {subject.assignments &&
                        subject.assignments.length > 0 && (
                          <span>{subject.assignments.length} teacher(s)</span>
                        )}
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => openViewModal(subject)}
                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => openEditModal(subject)}
                        className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(subject)}
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
                {showEditModal ? "Edit Subject" : "Add New Subject"}
              </h2>
              <button
                onClick={() => {
                  if (showAddModal) setShowAddModal(false);
                  if (showEditModal) setShowEditModal(false);
                  setSelectedSubject(null);
                  setErrors({});
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Subject Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Mathematics"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Subject Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Code *
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  placeholder="e.g., MATH"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.code ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.code && (
                  <p className="text-red-500 text-xs mt-1">{errors.code}</p>
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
                  placeholder="Enter subject description..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (showAddModal) setShowAddModal(false);
                  if (showEditModal) setShowEditModal(false);
                  setSelectedSubject(null);
                  setErrors({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showEditModal ? handleUpdateSubject : handleAddSubject}
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving
                  ? "Saving..."
                  : showEditModal
                    ? "Update Subject"
                    : "Add Subject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Subject Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedSubject(null);
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
                  {selectedSubject.name}
                </h3>
                <p className="text-gray-500">{selectedSubject.code}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase">
                  Description
                </label>
                <p className="text-gray-900">
                  {selectedSubject.description || "No description"}
                </p>
              </div>

              {selectedSubject.subjectClasses &&
                selectedSubject.subjectClasses.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
                      Assigned Classes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubject.subjectClasses.map((cls) => (
                        <span
                          key={cls.id}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {cls.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {selectedSubject.assignments &&
                selectedSubject.assignments.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
                      Assigned Teachers
                    </label>
                    <div className="space-y-2">
                      {selectedSubject.assignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="p-2 bg-gray-50 rounded-lg"
                        >
                          <p className="font-medium">
                            {assignment.teacher?.firstName}{" "}
                            {assignment.teacher?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {assignment.teacher?.staff?.employeeId}
                          </p>
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
                  openEditModal(selectedSubject);
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
      {showDeleteConfirm && selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Delete Subject</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedSubject.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedSubject(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubject}
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
