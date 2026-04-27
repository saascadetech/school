"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Loader2, Clock, Users } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface TimetableEntry {
  id: string;
  dayOfWeek: string;
  periodNumber: number;
  subject?: string;
  subjectId?: string;
  classId?: string;
  className?: string;
  teacherName?: string;
  roomNumber?: string;
  startTime?: string;
  endTime?: string;
}

interface ClassData {
  id: string;
  name: string;
}

interface SubjectData {
  id: string;
  name: string;
}

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8];

interface FormData {
  classId: string;
  subjectId: string;
  dayOfWeek: string;
  periodNumber: number;
  roomNumber: string;
}

const initialFormData: FormData = {
  classId: "",
  subjectId: "",
  dayOfWeek: "MON",
  periodNumber: 1,
  roomNumber: "",
};

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<Record<string, TimetableEntry[]>>(
    {},
  );
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterClass, setFilterClass] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(
    null,
  );

  // Form state
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (filterClass) {
      fetchTimetable();
    }
  }, [filterClass]);

  async function fetchTimetable() {
    if (!filterClass) return;
    try {
      const res = await fetch(
        `${API_URL}/api/timetable?classId=${filterClass}`,
      );
      if (res.ok) {
        const data = await res.json();
        setTimetable(data);
      }
    } catch (err) {
      console.error("Failed to fetch timetable:", err);
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

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.classId) newErrors.classId = "Class is required";
    if (!formData.subjectId) newErrors.subjectId = "Subject is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleAddEntry() {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/timetable`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Timetable entry added successfully!");
        setShowAddModal(false);
        setFormData(initialFormData);
        fetchTimetable();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add entry");
      }
    } catch (error) {
      alert("Failed to add entry");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateEntry() {
    if (!validateForm() || !selectedEntry) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/timetable`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedEntry.id,
          subjectId: formData.subjectId,
          roomNumber: formData.roomNumber,
        }),
      });

      if (res.ok) {
        alert("Timetable entry updated successfully!");
        setShowEditModal(false);
        setSelectedEntry(null);
        fetchTimetable();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update entry");
      }
    } catch (error) {
      alert("Failed to update entry");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteEntry() {
    if (!selectedEntry) return;

    setSaving(true);
    try {
      const res = await fetch(
        `${API_URL}/api/timetable?id=${selectedEntry.id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        alert("Timetable entry deleted successfully!");
        setShowDeleteConfirm(false);
        setSelectedEntry(null);
        fetchTimetable();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete entry");
      }
    } catch (error) {
      alert("Failed to delete entry");
    } finally {
      setSaving(false);
    }
  }

  function openEditModal(entry: TimetableEntry) {
    setSelectedEntry(entry);
    setFormData({
      classId: entry.classId || "",
      subjectId: entry.subjectId || "",
      dayOfWeek: entry.dayOfWeek,
      periodNumber: entry.periodNumber,
      roomNumber: entry.roomNumber || "",
    });
    setShowEditModal(true);
  }

  function openDeleteConfirm(entry: TimetableEntry) {
    setSelectedEntry(entry);
    setShowDeleteConfirm(true);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Timetable Management
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-w-48"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setFormData({
                  ...initialFormData,
                  classId: filterClass,
                });
                setErrors({});
                setShowAddModal(true);
              }}
              disabled={!filterClass}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Period
            </button>
          </div>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : filterClass ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase w-20">
                      Period
                    </th>
                    {DAYS.map((day) => (
                      <th
                        key={day}
                        className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PERIODS.map((period) => (
                    <tr key={period}>
                      <td className="px-4 py-3 text-center text-sm font-medium bg-gray-50">
                        {period}
                      </td>
                      {DAYS.map((day) => {
                        const entry = timetable[day]?.find(
                          (e) => e.periodNumber === period,
                        );
                        return (
                          <td key={day} className="px-2 py-2">
                            {entry ? (
                              <div className="bg-indigo-50 rounded-lg p-2 text-center">
                                <p className="text-sm font-medium text-indigo-700">
                                  {entry.subject}
                                </p>
                                {entry.teacherName && (
                                  <p className="text-xs text-indigo-500">
                                    {entry.teacherName}
                                  </p>
                                )}
                                {entry.roomNumber && (
                                  <p className="text-xs text-gray-400">
                                    {entry.roomNumber}
                                  </p>
                                )}
                                <div className="flex justify-center gap-1 mt-1">
                                  <button
                                    onClick={() => openEditModal(entry)}
                                    className="p-1 text-indigo-600 hover:bg-indigo-100 rounded"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => openDeleteConfirm(entry)}
                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setFormData({
                                    classId: filterClass,
                                    subjectId: "",
                                    dayOfWeek: day,
                                    periodNumber: period,
                                    roomNumber: "",
                                  });
                                  setShowAddModal(true);
                                }}
                                className="w-full p-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-xs"
                              >
                                +
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>Select a class to view timetable</p>
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
                {showEditModal ? "Edit Period" : "Add Period"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedEntry(null);
                  setErrors({});
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Day */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day
                  </label>
                  <select
                    value={formData.dayOfWeek}
                    onChange={(e) =>
                      setFormData({ ...formData, dayOfWeek: e.target.value })
                    }
                    disabled={showEditModal}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      showEditModal ? "bg-gray-100" : "border-gray-300"
                    }`}
                  >
                    {DAYS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Period
                  </label>
                  <select
                    value={formData.periodNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        periodNumber: parseInt(e.target.value),
                      })
                    }
                    disabled={showEditModal}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      showEditModal ? "bg-gray-100" : "border-gray-300"
                    }`}
                  >
                    {PERIODS.map((p) => (
                      <option key={p} value={p}>
                        Period {p}
                      </option>
                    ))}
                  </select>
                </div>
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
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                    errors.subjectId ? "border-red-500" : "border-gray-300"
                  }`}
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

              {/* Room Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Number
                </label>
                <input
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, roomNumber: e.target.value })
                  }
                  placeholder="e.g., Room 101"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedEntry(null);
                  setErrors({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={showEditModal ? handleUpdateEntry : handleAddEntry}
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-70 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving
                  ? "Saving..."
                  : showEditModal
                    ? "Update Period"
                    : "Add Period"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Delete Period</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the {selectedEntry.subject}{" "}
                period on {selectedEntry.dayOfWeek}?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedEntry(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteEntry}
                  disabled={saving}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-70 flex items-center gap-2"
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
