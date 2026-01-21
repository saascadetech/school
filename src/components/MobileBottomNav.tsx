"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Calendar, ClipboardList, Bell, User } from "lucide-react";

interface MobileBottomNavProps {
  role?: "student" | "teacher" | "admin";
}

export function MobileBottomNav({ role = "student" }: MobileBottomNavProps) {
  const pathname = usePathname();

  const studentLinks = [
    { href: "/student", icon: Home, label: "Home" },
    { href: "/student/schedule", icon: Calendar, label: "Schedule" },
    { href: "/student/homework", icon: ClipboardList, label: "Homework" },
    { href: "/student/notices", icon: Bell, label: "Notices" },
    { href: "/student/profile", icon: User, label: "Profile" },
  ];

  const teacherLinks = [
    { href: "/teacher", icon: Home, label: "Home" },
    { href: "/teacher/schedule", icon: Calendar, label: "Schedule" },
    { href: "/teacher/attendance", icon: ClipboardList, label: "Attendance" },
    { href: "/teacher/alerts", icon: Bell, label: "Alerts" },
    { href: "/teacher/tasks", icon: User, label: "Tasks" },
  ];

  const adminLinks = [
    { href: "/admin", icon: Home, label: "Home" },
    { href: "/admin/students", icon: User, label: "Students" },
    { href: "/admin/staff", icon: User, label: "Staff" },
    { href: "/admin/notices", icon: Bell, label: "Notices" },
    { href: "/admin/reports", icon: ClipboardList, label: "Reports" },
  ];

  const links =
    role === "teacher"
      ? teacherLinks
      : role === "admin"
        ? adminLinks
        : studentLinks;

  return (
    <>
      {/* Spacer for fixed bottom nav */}
      <div className="h-16 lg:hidden" />

      {/* Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe">
        <div className="flex items-center justify-around h-16">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full px-2 transition-colors",
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <link.icon
                  className={cn("w-5 h-5", isActive && "stroke-[2.5]")}
                />
                <span className="text-xs mt-1 font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
