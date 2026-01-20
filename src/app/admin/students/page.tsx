"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, students } from "@/lib/data";
import {
  Users,
  Plus,
  Search,
  Filter,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  MoreVertical,
  Edit,
  Eye,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentsPage() {
  const [role, setRole] = useState<Role>("principal");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterClass === "all" || student.classId === filterClass;
    return matchesSearch && matchesFilter;
  });

  const activeStudents = students.filter((s) => s.status === "active").length;
  const inactiveStudents = students.length - activeStudents;
  const transportStudents = students.filter((s) => s.transportRoute).length;

  const statusLabels: Record<string, { label: string; class: string }> = {
    active: { label: "Active", class: "bg-green-100 text-green-700" },
    inactive: { label: "Inactive", class: "bg-gray-100 text-gray-700" },
    transferred: { label: "Transferred", class: "bg-amber-100 text-amber-700" },
    passed_out: { label: "Passed Out", class: "bg-blue-100 text-blue-700" },
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Students Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage student admissions and records
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-outline flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Admission Enquiry
            </button>
            <button className="btn btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Student
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {activeStudents}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive</p>
                <p className="text-2xl font-bold text-amber-600">
                  {inactiveStudents}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Using Transport</p>
                <p className="text-2xl font-bold text-purple-600">
                  {transportStudents}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, admission number, or parent name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Classes</option>
                <option value="class-1">Class 3-A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {student.admissionNumber}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span>
                      Class{" "}
                      {student.classId === "class-1" ? "3" : student.classId} -
                      Section {student.section}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Roll No: {student.rollNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{student.parentPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{student.parentName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>
                      DOB: {new Date(student.dob).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      statusLabels[student.status].class,
                    )}
                  >
                    {statusLabels[student.status].label}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 rounded-full text-xs font-medium text-blue-700">
                    {student.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="card p-8 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No students found</p>
          </div>
        )}
      </main>
    </div>
  );
}
