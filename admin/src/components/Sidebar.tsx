"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";

// Single source of truth for all menu items
export const menuItems = [
  { label: "Dashboard", href: "/" },
  { label: "Students", href: "/students" },
  { label: "Staff", href: "/staff" },
  { label: "Fees", href: "/fees" },
  { label: "Notices", href: "/notices" },
  { label: "Classes", href: "/classes" },
  { label: "Subjects", href: "/subjects" },
  { label: "Exams", href: "/exams" },
  { label: "Homework", href: "/homework" },
  { label: "Attendance", href: "/attendance" },
  { label: "Timetable", href: "/timetable" },
  { label: "Transport", href: "/transport" },
  { label: "Reports", href: "/reports" },
  { label: "Budget", href: "/budget" },
  { label: "Leave", href: "/leave" },
  { label: "Activity", href: "/activity" },
  { label: "Settings", href: "/settings" },
  { label: "Users", href: "/users" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
          <span className="text-lg font-bold text-indigo-600">
            School Admin
          </span>
        </div>
      </div>
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
