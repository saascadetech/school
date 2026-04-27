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
  Bell,
  Send,
  FileText,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface Notice {
  id: string;
  title: string;
  content?: string;
  type: string;
  targetAudience: string;
  status: string;
  publishDate?: string;
  expiryDate?: string;
  createdAt?: string;
}

interface FormData {
  title: string;
  content: string;
  type: string;
  targetAudience: string;
  status: string;
  publishDate: string;
  expiryDate: string;
}

const initialFormData: FormData = {
  title: "",
  content: "",
  type: "general",
  targetAudience: "all",
  status: "published",
  publishDate: new Date().toISOString().split("T")[0],
  expiryDate: "",
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchNotices();
  }, [filterType, filterStatus]);

  async function fetchNotices() {
    try {
      let url = `${API_URL}/api/notices`;
      const params = new URLSearchParams();
      if (filterType) params.append("type", filterType);
      if (filterStatus) params.append("status", filterStatus);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setNotices(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch notices:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredNotices = notices.filter(
    (n) =>
      n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleAddNotice() {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        type: formData.type,
        targetAudience: formData.targetAudience,
        status: formData.status,
        publishDate: formData.publishDate || undefined,
        expiryDate: formData.expiryDate || undefined,
      };

      const res = await fetch(`${API_URL}/api/notices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Notice created successfully!");
        setShowAddModal(false);
        setFormData(initialFormData);
        fetchNotices();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create notice");
      }
    } catch (error) {
      alert("Failed to create notice");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateNotice() {
    if (!validateForm() || !selectedNotice) return;

    setSaving(true);
    try {
      const payload = {
        id: selectedNotice.id,
        title: formData.title,
        content: formData.content,
        type: formData.type,
        targetAudience: formData.targetAudience,
        status: formData.status,
        publishDate: formData.publishDate || undefined,
        expiryDate: formData.expiryDate || null,
      };

      const res = await fetch(`${API_URL}/api/notices`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Notice updated successfully!");
        setShowEditModal(false);
        setSelectedNotice(null);
        fetchNotices();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update notice");
      }
    } catch (error) {
      alert("Failed to update notice");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteNotice() {
    if (!selectedNotice) return;

    setSaving(true);
    try {
      const res = await fetch(
        `${API_URL}/api/notices?id=${selectedNotice.id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        alert("Notice deleted successfully!");
        setShowDeleteConfirm(false);
        setSelectedNotice(null);
        fetchNotices();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete notice");
      }
    } catch (error) {
      alert("Failed to delete notice");
    } finally {
      setSaving(false);
    }
  }

  function openViewModal(notice: Notice) {
    setSelectedNotice(notice);
    setShowViewModal(true);
  }

  function openEditModal(notice: Notice) {
    setSelectedNotice(notice);
    setFormData({
      title: notice.title || "",
      content: notice.content || "",
      type: notice.type || "general",
      targetAudience: notice.targetAudience || "all",
      status: notice.status || "published",
      publishDate: notice.publishDate?.split("T")[0] || "",
      expiryDate: notice.expiryDate?.split("T")[0] || "",
    });
    setShowEditModal(true);
  }

  function openDeleteConfirm(notice: Notice) {
    setSelectedNotice(notice);
    setShowDeleteConfirm(true);
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      general: "bg-gray-100 text-gray-700",
      academic: "bg-blue-100 text-blue-700",
      event: "bg-purple-100 text-purple-700",
      urgent: "bg-red-100 text-red-700",
      holiday: "bg-green-100 text-green-700",
      exam: "bg-orange-100 text-orange-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      general: "General",
      academic: "Academic",
      event: "Event",
      urgent: "Urgent",
      holiday: "Holiday",
      exam: "Exam",
    };
    return labels[type] || type;
  };

  const getTargetLabel = (target: string) => {
    const labels: Record<string, string> = {
      all: "All",
      student: "Students",
      staff: "Staff",
      parent: "Parents",
    };
    return labels[target] || target;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Notices Management
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Types</option>
              <option value="general">General</option>
              <option value="academic">Academic</option>
              <option value="event">Event</option>
              <option value="urgent">Urgent</option>
              <option value="holiday">Holiday</option>
              <option value="exam">Exam</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64"
              />
            </div>
            <button
              onClick={() => {
                setFormData({
                  ...initialFormData,
                  publishDate: new Date().toISOString().split("T")[0],
                });
                setErrors({});
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Notice
            </button>
          </div>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No notices found
                </div>
              ) : (
                filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${getTypeColor(notice.type)}`}
                        >
                          <Bell className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {notice.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                                notice.type,
                              )}`}
                            >
                              {getTypeLabel(notice.type)}
                            </span>
                            <span className="text-xs text-gray-500">
                              To: {getTargetLabel(notice.targetAudience)}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                notice.status === "published"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {notice.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openViewModal(notice)}
                          className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(notice)}
                          className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(notice)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {notice.content && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2 ml-11">
                        {notice.content}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3 ml-11 text-xs text-gray-500">
                      {notice.publishDate && (
                        <span>
                          Published:{" "}
                          {new Date(notice.publishDate).toLocaleDateString()}
                        </span>
                      )}
                      {notice.expiryDate && (
                        <span>
                          Expires:{" "}
                          {new Date(notice.expiryDate).toLocaleDateString()}
                        </span>
                      )}
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
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                {showEditModal ? "Edit Notice" : "Create Notice"}
              </h2>
              <button
                onClick={() => {
                  if (showAddModal) setShowAddModal(false);
                  if (showEditModal) setShowEditModal(false);
                  setSelectedNotice(null);
                  setErrors({});
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
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
                  placeholder="Enter notice title..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Enter notice content..."
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Type and Target */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notice Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="general">General</option>
                    <option value="academic">Academic</option>
                    <option value="event">Event</option>
                    <option value="urgent">Urgent</option>
                    <option value="holiday">Holiday</option>
                    <option value="exam">Exam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        targetAudience: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="all">All</option>
                    <option value="student">Students</option>
                    <option value="staff">Staff</option>
                    <option value="parent">Parents</option>
                  </select>
                </div>
              </div>

              {/* Status */}
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
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) =>
                      setFormData({ ...formData, publishDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (showAddModal) setShowAddModal(false);
                  if (showEditModal) setShowEditModal(false);
                  setSelectedNotice(null);
                  setErrors({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showEditModal ? handleUpdateNotice : handleAddNotice}
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-colors flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving
                  ? "Saving..."
                  : showEditModal
                    ? "Update Notice"
                    : formData.status === "published"
                      ? "Publish Notice"
                      : "Save as Draft"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Notice Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedNotice(null);
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2 rounded-lg ${getTypeColor(selectedNotice.type)}`}
                >
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedNotice.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                        selectedNotice.type,
                      )}`}
                    >
                      {getTypeLabel(selectedNotice.type)}
                    </span>
                    <span className="text-sm text-gray-500">
                      To: {getTargetLabel(selectedNotice.targetAudience)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedNotice.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedNotice.status}
                    </span>
                  </div>
                </div>
              </div>

              {selectedNotice.content && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedNotice.content}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Publish Date
                  </label>
                  <p className="text-gray-900">
                    {selectedNotice.publishDate
                      ? new Date(
                          selectedNotice.publishDate,
                        ).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Expiry Date
                  </label>
                  <p className="text-gray-900">
                    {selectedNotice.expiryDate
                      ? new Date(selectedNotice.expiryDate).toLocaleDateString()
                      : "No expiry"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedNotice);
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
      {showDeleteConfirm && selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Delete Notice</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <strong>{selectedNotice.title}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedNotice(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteNotice}
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
