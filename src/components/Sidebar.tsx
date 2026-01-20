"use client";

import { cn } from "@/lib/utils";
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
  ShieldCheck,
  ChevronRight,
  Zap,
  Globe,
  Command,
  Layout
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  role: Role | null;
  onRoleChange?: (role: Role) => void;
}

export function Sidebar({ role, onRoleChange }: SidebarProps) {
  const pathname = usePathname();

  const menuItems: Record<Role, any[]> = {
    teacher: [
      { icon: LayoutDashboard, label: "Teacher Home", href: "/teacher" },
      { icon: Users, label: "Attendance", href: "/teacher/attendance" },
      { icon: BookOpen, label: "Courses", href: "/teacher/syllabus" },
      { icon: ClipboardList, label: "Assignments", href: "/teacher/homework" },
      { icon: Activity, label: "Activities", href: "/teacher/activities" },
    ],
    student: [
      { icon: LayoutDashboard, label: "Student Home", href: "/student" },
      { icon: Calendar, label: "Attendance", href: "/student/attendance" },
      { icon: BookOpen, label: "Subjects", href: "/student/syllabus" },
      { icon: ClipboardList, label: "Homework", href: "/student/homework" },
      { icon: Bus, label: "Bus Tracking", href: "/student/transport" },
      { icon: DollarSign, label: "Fees", href: "/student/fees" },
      { icon: FileText, label: "Certificates", href: "/student/certificates" },
    ],
    admin: [
      { icon: LayoutDashboard, label: "Admin Home", href: "/admin" },
      { icon: BookOpen, label: "Curriculum", href: "/admin#curriculum" },
      { icon: Calendar, label: "Timetable", href: "/admin/timetable" },
      { icon: Bus, label: "Transport", href: "/admin/transport" },
      { icon: DollarSign, label: "Accounts & Fees", href: "/admin/fees" },
      { icon: FileText, label: "School Reports", href: "/admin/reports" },
    ],
  };

  const currentItems = role ? menuItems[role] : [];

  return (
    <aside className="w-[var(--sidebar-width)] flex-shrink-0 bg-white/40 backdrop-blur-3xl border-r border-white/60 flex flex-col z-40">
      {/* Sidebar Top Spacing */}
      <div className="p-8">
         <div className="p-6 bg-google-gray-900 rounded-[24px] flex flex-col gap-4 relative overflow-hidden group shadow-xl border border-white/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-elite-blue/20 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex items-center justify-between">
               <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Command className="w-5 h-5 text-white" />
               </div>
               <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] border border-white/10 px-2 py-0.5 rounded-full">School</span>
            </div>
            <div className="flex flex-col relative z-10">
               <span className="text-lg font-black text-white tracking-tighter uppercase">Global Academy</span>
               <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-0.5">Management Portal</span>
            </div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mb-10 px-6">
           <div className="pt-2 pb-4 px-4 border-b border-google-gray-100/50 mb-6">
              <h4 className="text-[10px] font-black text-google-gray-400 uppercase tracking-[0.3em]">Main Menu</h4>
           </div>
           <div className="space-y-2">
              {currentItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 relative group border shadow-sm mb-2",
                      isActive 
                        ? "bg-white text-elite-blue border-white shadow-elite-soft" 
                        : "text-google-gray-500 bg-white/20 border-white/40 hover:text-elite-blue hover:bg-white hover:border-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-elite-blue")} />
                    <span className="text-[14px] font-bold tracking-tight uppercase tracking-widest">{item.label}</span>
                    {isActive && (
                      <div className="absolute right-5 w-1.5 h-1.5 bg-elite-blue rounded-full" />
                    )}
                  </Link>
                );
              })}
           </div>
        </div>

        <div className="px-6 mt-6">
           <div className="pt-2 pb-4 px-4 border-b border-google-gray-100/50 mb-6">
              <h4 className="text-[10px] font-black text-google-gray-400 uppercase tracking-[0.3em]">Other Options</h4>
           </div>
            <div className="space-y-2">
               <button className="flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 w-full text-google-gray-500 bg-white/20 border border-white/40 hover:text-elite-blue hover:bg-white hover:border-white shadow-sm mb-2">
                  <Settings className="w-5 h-5" />
                  <span className="text-[14px] font-bold uppercase tracking-widest">Settings</span>
               </button>
               <button 
                  onClick={() => {
                    localStorage.removeItem("school_auth_role");
                    window.location.href = "/login";
                  }}
                  className="flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 w-full text-elite-rose bg-white/20 border border-white/40 hover:bg-rose-50 hover:border-rose-100 shadow-sm"
               >
                  <LogOut className="w-5 h-5" />
                  <span className="text-[14px] font-bold uppercase tracking-widest">Logout</span>
               </button>
            </div>
        </div>
      </div>

      <div className="p-8 border-t border-google-gray-100/50 bg-white/20">
         <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
               <div className="w-9 h-9 bg-elite-blue/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-elite-blue" />
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-google-gray-900 tracking-tighter uppercase mb-0.5">Primary Campus</span>
                  <span className="text-[9px] font-bold text-google-gray-400 uppercase">School Online</span>
               </div>
            </div>
            <p className="text-[9px] font-bold text-google-gray-400 uppercase tracking-widest leading-loose">
               School Management System<br/>
               Version 2.0
            </p>
         </div>
      </div>
    </aside>
  );
}
