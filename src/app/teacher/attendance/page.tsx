"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Role,
  students,
  getClass,
  getSubjectName,
  getTodayTimetable,
} from "@/lib/data";
import { ArrowLeft, Check, X, Save, User } from "lucide-react";
import Link from "next/link";

export default function TeacherAttendancePage() {
  const [role, setRole] = useState<Role>("teacher");
  const [absentStudents, setAbsentStudents] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  const classId = "class-1";
  const classData = getClass(classId);
  const timetable = getTodayTimetable(classId);

  const toggleAbsent = (studentId: string) => {
    setAbsentStudents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
    setSaved(false);
  };

  const saveAttendance = () => {
    // In real app, this would save to backend
    console.log("Saving absent students:", Array.from(absentStudents));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetForm = () => {
    setAbsentStudents(new Set());
    setSaved(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Mark Attendance
                </h1>
                <p className="text-gray-500 mt-1">
                  {classData?.name} - Section {classData?.section}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={saved ? "success" : "warning"}>
                  {saved ? "Saved" : "Unsaved Changes"}
                </Badge>
                <Button variant="secondary" onClick={resetForm}>
                  Reset
                </Button>
                <Button onClick={saveAttendance} loading={saved}>
                  <Save className="w-4 h-4" />
                  Save Attendance
                </Button>
              </div>
            </div>
          </div>

          {/* Timetable Context */}
          {timetable.length > 0 && (
            <Card className="mb-6">
              <CardBody>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-gray-500">
                    Today's Classes:
                  </span>
                  {timetable.map((period) => (
                    <Badge key={period.id} variant="info">
                      Period {period.periodNumber}:{" "}
                      {getSubjectName(period.subjectId)}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {/* Attendance Grid */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Student List</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Tap to mark absent. All students are present by default.
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {students.length - absentStudents.size}/{students.length}
                </p>
                <p className="text-sm text-gray-500">Present</p>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                {students.map((student) => {
                  const isAbsent = absentStudents.has(student.id);
                  return (
                    <button
                      key={student.id}
                      onClick={() => toggleAbsent(student.id)}
                      className={`w-full flex items-center justify-between p-4 transition-all duration-200 ${
                        isAbsent
                          ? "bg-red-50 hover:bg-red-100"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isAbsent
                              ? "bg-red-100 text-red-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          <User className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p
                            className={`font-medium ${
                              isAbsent ? "text-red-700" : "text-gray-900"
                            }`}
                          >
                            {student.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Parent: {student.parentName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isAbsent ? (
                          <>
                            <Badge variant="danger">Absent</Badge>
                            <X className="w-5 h-5 text-red-500" />
                          </>
                        ) : (
                          <>
                            <Badge variant="success">Present</Badge>
                            <Check className="w-5 h-5 text-emerald-500" />
                          </>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Absent Summary */}
          {absentStudents.size > 0 && (
            <Card className="mt-6 bg-red-50 border-red-100">
              <CardBody>
                <h3 className="font-medium text-red-800 mb-2">
                  Absent Students ({absentStudents.size})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(absentStudents).map((studentId) => {
                    const student = students.find((s) => s.id === studentId);
                    return (
                      <Badge key={studentId} variant="danger">
                        {student?.name}
                      </Badge>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
