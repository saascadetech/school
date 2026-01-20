"use client";

import { useState } from "react";
import { Role } from "@/lib/data";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  Bus,
  DollarSign,
  FileText,
  Activity,
  LogOut,
  Settings,
  Menu,
  X,
  Home,
  School,
  Users as UsersIcon,
  Library,
  Briefcase,
  Bell,
  BarChart,
  TrendingUp,
  MessageSquare,
  Edit,
  Award,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role: Role | null;
  onRoleChange?: (role: Role) => void;
}

export function Sidebar({ role, onRoleChange }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: Record<Role, { icon: any; label: string; href: string }[]> =
    {
      teacher: [
        { icon: Home, label: "Dashboard", href: "/teacher" },
        { icon: Users, label: "My Students", href: "/teacher/students" },
        { icon: Calendar, label: "My Schedule", href: "/teacher/schedule" },
        { icon: CheckCircle, label: "Attendance", href: "/teacher/attendance" },
        { icon: Edit, label: "Marks Entry", href: "/teacher/marks" },
        { icon: BookOpen, label: "Syllabus", href: "/teacher/syllabus" },
        { icon: ClipboardList, label: "Homework", href: "/teacher/homework" },
        { icon: Activity, label: "Activities", href: "/teacher/activities" },
        {
          icon: TrendingUp,
          label: "Performance",
          href: "/teacher/performance",
        },
        {
          icon: MessageSquare,
          label: "Communication",
          href: "/teacher/communication",
        },
        { icon: Clock, label: "Tasks", href: "/teacher/tasks" },
        { icon: AlertCircle, label: "Alerts", href: "/teacher/alerts" },
      ],
      student: [
        { icon: Home, label: "Dashboard", href: "/student" },
        {
          icon: TrendingUp,
          label: "Performance",
          href: "/student/performance",
        },
        { icon: Calendar, label: "My Schedule", href: "/student/schedule" },
        { icon: Calendar, label: "Attendance", href: "/student/attendance" },
        { icon: FileText, label: "Exams", href: "/student/exams" },
        { icon: FileText, label: "Results", href: "/student/results" },
        { icon: BookOpen, label: "Subjects", href: "/student/syllabus" },
        { icon: ClipboardList, label: "Homework", href: "/student/homework" },
        { icon: Bell, label: "Notices", href: "/student/notices" },
        { icon: Clock, label: "Calendar", href: "/student/calendar" },
        { icon: Users, label: "Teachers", href: "/student/teachers" },
        { icon: Bus, label: "Transport", href: "/student/transport" },
        { icon: DollarSign, label: "Fees", href: "/student/fees" },
        {
          icon: FileText,
          label: "Certificates",
          href: "/student/certificates",
        },
        { icon: MessageSquare, label: "Leave Request", href: "/student/leave" },
        { icon: User, label: "Profile", href: "/student/profile" },
      ],
      admin: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: Users, label: "Staff Management", href: "/admin/staff" },
        { icon: GraduationCap, label: "Students", href: "/admin/students" },
        {
          icon: ClipboardList,
          label: "Examinations",
          href: "/admin/examinations",
        },
        { icon: DollarSign, label: "Expenses", href: "/admin/expenses" },
        { icon: Briefcase, label: "Assets", href: "/admin/assets" },
        { icon: Bell, label: "Notices", href: "/admin/notices" },
        { icon: BarChart, label: "Reports", href: "/admin/reports" },
      ],
      principal: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: Users, label: "Staff Management", href: "/admin/staff" },
        { icon: GraduationCap, label: "Students", href: "/admin/students" },
        {
          icon: ClipboardList,
          label: "Examinations",
          href: "/admin/examinations",
        },
        { icon: DollarSign, label: "Expenses", href: "/admin/expenses" },
        { icon: Briefcase, label: "Assets", href: "/admin/assets" },
        { icon: Bell, label: "Notices", href: "/admin/notices" },
        { icon: BarChart, label: "Reports", href: "/admin/reports" },
      ],
    };

  const currentItems = role ? menuItems[role] : [];

  const roleLabels: Record<Role, string> = {
    admin: "Administrator",
    teacher: "Teacher",
    student: "Student",
    principal: "Principal",
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Mobile Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">School Management</p>
              <p className="text-xs text-gray-500">
                {roleLabels[role || "admin"]}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {currentItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("school_auth_role");
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar - Fixed to left, full height */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200 lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:overflow-y-auto">
        {/* Desktop Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">School Management</p>
              <p className="text-xs text-gray-500">
                {roleLabels[role || "admin"]}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {currentItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Desktop Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("school_auth_role");
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
