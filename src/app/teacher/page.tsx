"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import {
  Role,
  getTeacher,
  getTeacherClasses,
  getTeacherTimetable,
  getSubjectName,
  getTeacherSubject,
} from "@/lib/data";
import {
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  CheckCircle,
  MoreHorizontal,
  TrendingUp,
  LayoutGrid,
  Bell,
  HelpCircle,
  Clock,
  ChevronRight,
  Zap,
  Command,
  Plus,
  Target,
  FileText,
  UserCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TeacherHomePage() {
  const [role, setRole] = useState<Role>("teacher");
  const teacher = getTeacher("teacher-1");
  const assignedClasses = getTeacherClasses("teacher-1");
  const timetable = getTeacherTimetable("teacher-1");
  
  // UX Enhancement: Active Period Tracking
  // In a real app, this would use current system time
  const activePeriodNumber = 2; 

  const stats = [
    { label: "My Classes", value: assignedClasses.length, icon: LayoutGrid, color: "text-elite-blue", bg: "bg-elite-blue/10", trend: "Assigned" },
    { label: "Lessons", value: 12, icon: BookOpen, color: "text-elite-emerald", bg: "bg-elite-emerald/10", trend: "Curriculum" },
    { label: "Performance", value: "98%", icon: TrendingUp, color: "text-elite-amber", bg: "bg-elite-amber/10", trend: "Class Average" },
    { label: "School Ranking", value: "High", icon: Target, color: "text-elite-rose", bg: "bg-elite-rose/10", trend: "Top Faculty" },
  ];

  return (
    <div className="min-h-screen bg-google-gray-50 flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-elite-blue/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-elite-indigo/5 blur-[120px] rounded-full" />
      </div>

      <header className="h-20 px-6 md:px-10 flex items-center justify-between bg-white/40 backdrop-blur-3xl border-b border-white/60 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer">
             <div className="w-12 h-12 bg-google-gray-900 rounded-xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                <Command className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-google-gray-900 leading-none">TEACHER HUB</span>
                <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-elite-emerald rounded-full" />
                   Attendance Active
                </span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
           <button className="action-icon !w-10 !h-10">
             <Bell className="w-5 h-5" />
           </button>
           <button className="action-icon !w-10 !h-10">
             <HelpCircle className="w-5 h-5" />
           </button>
           <div className="h-6 w-[1px] bg-google-gray-200 mx-2" />
           <div className="flex items-center gap-3 hover:bg-white/50 p-1.5 pr-5 rounded-full transition-all cursor-pointer group shadow-sm bg-white/30 border border-white/60">
              <div className="w-10 h-10 bg-elite-emerald rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                 <UserCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[13px] font-black text-google-gray-900 leading-none">{teacher.name}</span>
                 <span className="text-[9px] font-bold text-google-gray-400 uppercase tracking-widest mt-0.5">Faculty Lead</span>
              </div>
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <Sidebar role={role} onRoleChange={setRole} />

        <main className="flex-1 overflow-y-auto">
          <div className="layout-container section-gap">
            {/* Header with Elite Spacing */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-google-gray-100">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-elite-emerald/5 border border-elite-emerald/10 rounded-full text-[10px] font-black uppercase tracking-widest text-elite-emerald">
                     <Zap className="w-3 h-3" />
                     Faculty Portal
                  </div>
                  <h2 className="text-4xl font-extrabold text-google-gray-900 tracking-tighter leading-tight">Teacher <span className="text-elite-blue">Home.</span></h2>
                  <p className="text-lg text-google-gray-500 font-medium tracking-tight">Welcome back! Manage your classes, attendance, and student progress here.</p>
               </div>
                <div className="flex gap-4">
                   <button className="px-6 py-2.5 bg-elite-rose/10 text-elite-rose border border-elite-rose/20 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-elite-rose hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2.5">
                      <Calendar className="w-4 h-4" />
                      Request Leave
                   </button>
                   <button className="px-6 py-2.5 bg-google-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-elite-blue transition-all shadow-xl active:scale-95 flex items-center gap-2.5">
                      <Plus className="w-4 h-4" />
                      New Class
                   </button>
                </div>
            </div>

            {/* Elite Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card p-8 flex flex-col gap-6 group">
                  <div className="flex justify-between items-start">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-md", stat.bg)}>
                      <stat.icon className={cn("w-6 h-6", stat.color)} />
                    </div>
                    <button className="action-icon h-9 w-9 !rounded-lg text-google-gray-300">
                       <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-black text-google-gray-400 uppercase tracking-[0.2em] leading-none mb-2">{stat.label}</h4>
                    <p className="text-3xl font-extrabold text-google-gray-900 tracking-tighter">{stat.value}</p>
                    <div className="flex items-center gap-2 pt-3">
                       <span className={cn("text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full", stat.bg, stat.color)}>{stat.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {assignedClasses.map((cls) => (
                     <div key={cls.id} className="glass-card p-10 bg-white flex flex-col hover:shadow-2xl border-white/60 group transition-all h-auto min-h-[380px]">
                        <div className="flex justify-between items-start mb-6">
                           <div className="w-16 h-16 bg-google-gray-900 rounded-2xl text-white flex flex-col items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                              <span className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-0.5">Section</span>
                              <span className="text-2xl font-black">{cls.name[cls.name.length-1]}{cls.section}</span>
                           </div>
                           <span className="px-4 py-1.5 bg-elite-emerald/10 text-elite-emerald text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-elite-emerald/20">Active</span>
                        </div>
                        <h3 className="text-2xl font-bold text-google-gray-900 mb-1 group-hover:text-elite-blue transition-colors">{cls.name} • Section {cls.section}</h3>
                        <p className="text-[12px] font-black text-google-gray-400 uppercase tracking-[0.2em] mb-8">
                           Subject: <span className="text-elite-blue">{getTeacherSubject("teacher-1", cls.id)}</span> • {cls.studentIds.length} Students
                        </p>
                        
                        <div className="mt-auto grid grid-cols-2 gap-4">
                           <Link href={`/teacher/attendance/${cls.id}`} className="flex items-center justify-center gap-2.5 py-4 bg-google-gray-50 text-google-gray-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-elite-blue hover:text-white hover:shadow-lg transition-all">
                              <CheckCircle className="w-3.5 h-3.5" />
                              Roll Call
                           </Link>
                           <Link href={`/teacher/homework/${cls.id}`} className="flex items-center justify-center gap-2.5 py-4 bg-google-gray-50 text-google-gray-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-elite-emerald hover:text-white hover:shadow-lg transition-all">
                              <ClipboardList className="w-3.5 h-3.5" />
                              Homework
                           </Link>
                        </div>
                     </div>
                   ))}
                </div>

                {/* Schedule Timetable for Teachers */}
                <div className="glass-card bg-white/40 overflow-hidden border-white/60 mt-12">
                   <div className="p-10 border-b border-google-gray-100/50 flex items-center justify-between">
                      <div className="flex items-center gap-5">
                         <div className="p-4 bg-elite-indigo/10 rounded-2xl shadow-inner">
                            <Clock className="w-7 h-7 text-elite-indigo" />
                         </div>
                         <div className="flex flex-col">
                            <h3 className="text-3xl font-bold text-google-gray-900 tracking-tight">Today&apos;s Schedule</h3>
                            <span className="text-sm font-medium text-google-gray-400">Class Session Alignment</span>
                         </div>
                      </div>
                      <Link href="/teacher/syllabus" className="px-8 py-3 bg-white border border-google-gray-100 rounded-2xl text-[13px] font-black uppercase tracking-widest text-elite-indigo hover:bg-elite-indigo hover:text-white hover:shadow-xl transition-all">Syllabus Hub</Link>
                   </div>
                   <div className="p-4">
                      {timetable.length > 0 ? (
                        <div className="space-y-4">
                          {timetable.map((period) => {
                            const isActive = period.periodNumber === activePeriodNumber;
                            return (
                              <div
                                key={period.id}
                                className={cn(
                                  "group flex items-center gap-10 p-8 rounded-[32px] transition-all duration-500 cursor-pointer border",
                                  isActive 
                                    ? "bg-elite-blue/5 border-elite-blue/30 shadow-[0_0_30px_rgba(0,102,255,0.1)] scale-[1.02]" 
                                    : "hover:bg-white border-transparent hover:border-google-gray-100 hover:shadow-elite-soft"
                                )}
                              >
                                <div className={cn(
                                  "w-20 h-20 rounded-[28px] border-2 flex flex-col items-center justify-center transition-all",
                                  isActive 
                                    ? "bg-elite-blue border-elite-blue shadow-xl text-white" 
                                    : "border-google-gray-100 group-hover:bg-elite-blue group-hover:border-elite-blue group-hover:shadow-xl group-hover:text-white"
                                )}>
                                  <span className={cn("text-[10px] font-black uppercase tracking-widest mb-1 opacity-50", isActive ? "text-white/60" : "group-hover:text-white/60")}>Period</span>
                                  <span className="text-2xl font-black">{period.periodNumber}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h4 className={cn("text-2xl font-bold transition-colors", isActive ? "text-elite-blue" : "text-google-gray-900 group-hover:text-elite-blue")}>
                                      {getSubjectName(period.subjectId)}
                                    </h4>
                                    {isActive && (
                                      <span className="flex items-center gap-1.5 px-3 py-1 bg-elite-blue text-white text-[9px] font-black uppercase tracking-widest rounded-full animate-pulse">
                                         Active Now
                                      </span>
                                    )}
                                    <span className="text-[10px] font-black bg-elite-blue/5 text-elite-blue px-3 py-1 rounded-full uppercase tracking-widest">Main Subject</span>
                                  </div>
                                  <p className="text-[15px] font-bold text-google-gray-400">
                                    <span className="text-google-gray-600">Class 3-A</span> • 09:30 AM Access
                                  </p>
                                </div>
                                <button className={cn(
                                  "px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                                  isActive 
                                    ? "bg-elite-blue text-white shadow-lg" 
                                    : "bg-google-gray-50 text-google-gray-500 group-hover:bg-elite-blue group-hover:text-white"
                                )}>
                                   {isActive ? "Continue session" : "Start Class"}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="py-24 flex flex-col items-center justify-center text-center opacity-40">
                           <Users className="w-12 h-12 mb-6" />
                           <p className="text-sm font-black uppercase tracking-[0.3em]">No Active Schedule</p>
                        </div>
                      )}
                   </div>
                </div>
              </div>

              {/* Sidebar Quick Navigation & Faculty Context */}
              <div className="space-y-8">
                <div className="glass-card p-8 border-white/80">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-elite-blue/10 rounded-xl">
                         <ClipboardList className="w-5 h-5 text-elite-blue" />
                      </div>
                      <div className="flex flex-col">
                         <h3 className="text-xl font-bold text-google-gray-900 tracking-tight">Active Tasks</h3>
                         <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-widest">To-Do List</span>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="p-5 bg-google-gray-50 rounded-2xl border border-transparent hover:border-google-gray-100 hover:bg-white transition-all cursor-pointer group shadow-sm">
                         <p className="text-[9px] font-black text-google-gray-400 uppercase mb-2 tracking-widest group-hover:text-elite-blue transition-colors">Pending</p>
                         <h4 className="text-base font-bold text-google-gray-900 mb-1">Math Quiz Papers</h4>
                         <div className="flex items-center gap-2 mt-3 text-[10px] font-black text-elite-rose bg-elite-rose/5 w-fit px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                            <Clock className="w-3 h-3" />
                            4h Left
                         </div>
                      </div>
                      <div className="p-5 bg-google-gray-50 rounded-2xl border border-transparent hover:border-google-gray-100 hover:bg-white transition-all cursor-pointer group shadow-sm">
                         <p className="text-[9px] font-black text-google-gray-400 uppercase mb-2 tracking-widest group-hover:text-elite-emerald transition-colors">Lesson Plan</p>
                         <h4 className="text-base font-bold text-google-gray-900 mb-1">Weekly Syllabus</h4>
                         <div className="flex items-center gap-2 mt-3 text-[10px] font-black text-google-gray-400 bg-google-gray-100 w-fit px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                            <CheckCircle className="w-3 h-3" />
                            Ready
                         </div>
                      </div>
                   </div>
                   <button className="w-full mt-8 py-4 bg-elite-blue text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg transition-all">
                      Review Workload
                   </button>
                </div>

                <div className="glass-card p-8 bg-gradient-to-br from-elite-blue to-elite-indigo text-white border-none shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                         <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/20">
                            <Zap className="w-5 h-5 text-white" />
                         </div>
                         <span className="text-sm font-black text-white tracking-widest uppercase">Admin Insights</span>
                      </div>
                      <p className="text-xl font-bold leading-relaxed mb-6 tracking-tight">
                         Class engagement is <span className="underline decoration-elite-emerald decoration-2 underline-offset-4">12% higher</span> than school average.
                      </p>
                      
                      {/* UX Enhancement: Engagement Heatmap Sparkline */}
                      <div className="flex flex-col gap-2 mb-8">
                         <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">Engagement Heatmap</span>
                         <div className="h-12 w-full flex items-end gap-1.5">
                            {[40, 60, 45, 80, 50, 90, 75, 40, 60, 85].map((val, i) => (
                               <div 
                                  key={i} 
                                  className="flex-1 bg-white/20 rounded-t-sm transition-all duration-700 group-hover:bg-white/40" 
                                  style={{ height: `${val}%` }} 
                               />
                            ))}
                         </div>
                         <div className="flex justify-between text-[8px] font-bold text-white/40 uppercase tracking-widest">
                            <span>Mon</span>
                            <span>Fri</span>
                         </div>
                      </div>

                      <button className="w-full py-3.5 bg-white text-elite-blue text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-google-gray-100 transition-all shadow-xl">
                         Deep Analytics
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
