"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, staff } from "@/lib/data";
import {
  Users,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  DollarSign,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StaffManagement() {
  const [role, setRole] = useState<Role>("principal");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === "all" || s.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const totalStaff = staff.length;
  const teachingCount = staff.filter((s) => s.role === "teaching").length;
  const nonTeachingCount = staff.filter(
    (s) => s.role === "non_teaching" || s.role === "support",
  ).length;
  const totalSalary = staff.reduce((sum, s) => sum + s.salary, 0);

  const roleLabels: Record<string, string> = {
    teaching: "Teaching",
    non_teaching: "Non-Teaching",
    support: "Support",
  };

  const statusLabels: Record<string, { label: string; class: string }> = {
    active: { label: "Active", class: "bg-green-100 text-green-700" },
    inactive: { label: "Inactive", class: "bg-gray-100 text-gray-700" },
    on_leave: { label: "On Leave", class: "bg-amber-100 text-amber-700" },
    terminated: { label: "Terminated", class: "bg-red-100 text-red-700" },
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Staff Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all teaching and non-teaching staff
            </p>
          </div>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Staff
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">{totalStaff}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Teaching Staff</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teachingCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Non-Teaching</p>
                <p className="text-2xl font-bold text-gray-900">
                  {nonTeachingCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Salary</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{(totalSalary / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, employee ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 focus outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Staff</option>
                <option value="teaching">Teaching Staff</option>
                <option value="non_teaching">Non-Teaching Staff</option>
                <option value="support">Support Staff</option>
              </select>
            </div>
          </div>
        </div>

        {/* Staff List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((member) => (
            <div
              key={member.id}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {member.employeeId}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>{member.designation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span>{member.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{member.experience} years experience</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      roleLabels[member.role] === "Teaching"
                        ? "bg-blue-100 text-blue-700"
                        : roleLabels[member.role] === "Non-Teaching"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700",
                    )}
                  >
                    {roleLabels[member.role]}
                  </span>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      statusLabels[member.status].class,
                    )}
                  >
                    {statusLabels[member.status].label}
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

        {filteredStaff.length === 0 && (
          <div className="card p-8 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No staff members found</p>
          </div>
        )}
      </main>
    </div>
  );
}
