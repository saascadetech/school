"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Check,
  X,
  Loader2,
  Calendar,
  Users,
  Clock,
  Edit2,
  Trash2,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface Student {
  id: string;
  firstName: string;
  lastName?: string;
  admissionNumber: string;
  classId?: string;
  className?: string;
}

interface ClassData {
  id: string;
  name: string;
  section?: string;
}

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName?: string;
  classId: string;
  date: string;
  status: string;
  periodNumber?: number;
  remarks?: string;
}

interface FormData {
  classId: string;
  date: string;
  periodNumber: number;
}

const initialFormData: FormData = {
  classId: "",
  date: new Date().toISOString().split("T")[0],
  periodNumber: 1,
};

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<
    Record<string, string>
  >({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // State
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudentsAndAttendance();
    }
  }, [selectedClass, selectedDate]);

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

  async function fetchStudentsAndAttendance() {
    if (!selectedClass) return;
    setLoading(true);

    try {
      // Fetch students for the class
      const studentsRes = await fetch(
        `${API_URL}/api/students?classId=${selectedClass}`,
      );
      let studentsData: Student[] = [];
      if (studentsRes.ok) {
        const data = await studentsRes.json();
        studentsData = Array.isArray(data)
          ? data.map(
              (
                s: Student & {
                  user?: { firstName?: string; lastName?: string };
                },
              ) => ({
                ...s,
                firstName: s.user?.firstName || s.firstName,
                lastName: s.user?.lastName || s.lastName,
              }),
            )
          : [];
      }
      setStudents(studentsData);

      // Fetch existing attendance for this date
      const attendanceRes = await fetch(
        `${API_URL}/api/attendance?classId=${selectedClass}&date=${selectedDate}`,
      );
      if (attendanceRes.ok) {
        const attData = await attendanceRes.json();
        const records: Record<string, string> = {};
        if (attData.records) {
          attData.records.forEach(
            (record: { studentId: string; status: string }) => {
              records[record.studentId] = record.status;
            },
          );
        }
        setAttendanceRecords(records);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkAttendance() {
    if (!selectedClass || !selectedDate || students.length === 0) return;

    setSaving(true);
    try {
      const records = students.map((student) => ({
        studentId: student.id,
        classId: selectedClass,
        status: attendanceRecords[student.id] || "present",
      }));

      const res = await fetch(`${API_URL}/api/attendance`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          records,
          date: selectedDate,
          periodNumber: formData.periodNumber,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Marked ${data.successful} students successfully!`);
        fetchStudentsAndAttendance();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to mark attendance");
      }
    } catch (error) {
      alert("Failed to mark attendance");
    } finally {
      setSaving(false);
    }
  }

  function markAllPresent() {
    const newRecords: Record<string, string> = {};
    students.forEach((s) => {
      newRecords[s.id] = "present";
    });
    setAttendanceRecords(newRecords);
  }

  function markAllAbsent() {
    const newRecords: Record<string, string> = {};
    students.forEach((s) => {
      newRecords[s.id] = "absent";
    });
    setAttendanceRecords(newRecords);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-700 border-green-300";
      case "absent":
        return "bg-red-100 text-red-700 border-red-300";
      case "late":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "half_day":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const presentCount = Object.values(attendanceRecords).filter(
    (s) => s === "present",
  ).length;
  const absentCount = Object.values(attendanceRecords).filter(
    (s) => s === "absent",
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Attendance Management
          </h1>
        </header>

        <div className="p-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-w-48"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} {cls.section ? `(${cls.section})` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
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
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option value={1}>Period 1</option>
                  <option value={2}>Period 2</option>
                  <option value={3}>Period 3</option>
                  <option value={4}>Period 4</option>
                  <option value={5}>Period 5</option>
                  <option value={6}>Period 6</option>
                  <option value={7}>Period 7</option>
                  <option value={8}>Period 8</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={markAllPresent}
                  className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  All Present
                </button>
                <button
                  onClick={markAllAbsent}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  All Absent
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          {selectedClass && students.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-500">Total Students</div>
                <div className="text-2xl font-bold">{students.length}</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-100">
                <div className="text-sm text-green-600">Present</div>
                <div className="text-2xl font-bold text-green-700">
                  {presentCount}
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-100">
                <div className="text-sm text-red-600">Absent</div>
                <div className="text-2xl font-bold text-red-700">
                  {absentCount}
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-100">
                <div className="text-sm text-blue-600">Attendance %</div>
                <div className="text-2xl font-bold text-blue-700">
                  {students.length > 0
                    ? Math.round((presentCount / students.length) * 100)
                    : 0}
                  %
                </div>
              </div>
            </div>
          )}

          {/* Students List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : selectedClass ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Adm No.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Student Name
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-12 text-center text-gray-500"
                      >
                        No students in this class
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">
                          {student.admissionNumber}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {student.firstName} {student.lastName || ""}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            {(
                              ["present", "absent", "late", "half_day"] as const
                            ).map((status) => (
                              <button
                                key={status}
                                onClick={() =>
                                  setAttendanceRecords({
                                    ...attendanceRecords,
                                    [student.id]: status,
                                  })
                                }
                                className={`px-3 py-1 rounded-lg text-sm font-medium border-2 transition-colors ${
                                  attendanceRecords[student.id] === status
                                    ? getStatusColor(status)
                                    : "border-gray-200 text-gray-400 hover:border-gray-300"
                                }`}
                              >
                                {status === "present" && "P"}
                                {status === "absent" && "A"}
                                {status === "late" && "L"}
                                {status === "half_day" && "HD"}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>Select a class to mark attendance</p>
            </div>
          )}
        </div>

        {/* Save Button */}
        {selectedClass && students.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {presentCount} Present, {absentCount} Absent out of{" "}
              {students.length} students
            </div>
            <button
              onClick={handleMarkAttendance}
              disabled={saving}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-70 transition-colors flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
