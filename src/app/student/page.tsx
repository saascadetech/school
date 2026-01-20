"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import {
  Role,
  getStudent,
  getTodayTimetable,
  getSubjectName,
  getHomework,
  getStudentFeeStatus,
  getStudentTransport,
} from "@/lib/data";
import {
  Clock,
  BookOpen,
  Calendar,
  CheckCircle,
  ClipboardList,
  DollarSign,
  Bus,
  ChevronRight,
  TrendingUp,
  Target,
  FileText,
  LayoutGrid,
  Plus,
  HelpCircle,
  Bell,
  MoreHorizontal,
  GraduationCap,
  Waves,
  Zap,
  Command,
  UserCircle,
  ShieldCheck,
  Award,
  Star,
  Flame,
  UserPlus
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function StudentHomePage() {
  const [role, setRole] = useState<Role>("student");
  const student = getStudent("stud-1");
  const timetable = getTodayTimetable("class-1");
  const homework = getHomework("class-1");
  const feeStatus = getStudentFeeStatus("stud-1");
  const transport = getStudentTransport("stud-1");

  if (!student) return null;

  const stats = [
    { label: "Daily Classes", value: timetable.length, icon: Clock, color: "text-elite-blue", bg: "bg-elite-blue/10", trend: "Today's Schedule" },
    { label: "Active HomeWork", value: homework.length, icon: ClipboardList, color: "text-elite-amber", bg: "bg-elite-amber/10", trend: "Due Soon" },
    { label: "Attendance", value: "100%", icon: CheckCircle, color: "text-elite-emerald", bg: "bg-elite-emerald/10", trend: "Perfect Record" },
    { label: "Fee Status", value: feeStatus.isPaid ? "Paid" : "Pending", icon: DollarSign, color: feeStatus.isPaid ? "text-elite-emerald" : "text-elite-rose", bg: feeStatus.isPaid ? "bg-elite-emerald/10" : "bg-elite-rose/10", trend: feeStatus.isPaid ? "Up to Date" : `Pending ₹${feeStatus.due}` },
  ];

  const quickLinks = [
    { icon: BookOpen, label: "Academics", href: "/student/syllabus", color: "text-elite-blue", bg: "bg-elite-blue/10" },
    { icon: ClipboardList, label: "Assignments", href: "/student/homework", color: "text-elite-emerald", bg: "bg-elite-emerald/10" },
    { icon: DollarSign, label: "Fee Portal", href: "/student/fees", color: "text-elite-rose", bg: "bg-elite-rose/10" },
    { icon: Bus, label: "Transport", href: "/student/transport", color: "text-elite-amber", bg: "bg-elite-amber/10" },
    { icon: FileText, label: "Certificates", href: "/student/certificates", color: "text-elite-blue", bg: "bg-elite-blue/10" },
    { icon: CheckCircle, label: "Attendance", href: "/student/attendance", color: "text-elite-emerald", bg: "bg-elite-emerald/10" },
  ];

  return (
    <div className="min-h-screen bg-google-gray-50 flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-elite-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-elite-emerald/5 blur-[100px] rounded-full" />
      </div>

      <header className="h-20 px-6 md:px-10 flex items-center justify-between bg-white/40 backdrop-blur-3xl border-b border-white/60 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-google-gray-900 rounded-xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                 <Command className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                 <h1 className="text-xl font-black tracking-tighter text-google-gray-900 leading-none">STUDENT PORTAL</h1>
                 <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-elite-blue rounded-full" />
                    Logged in
                 </span>
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-5">
           {/* UX Enhancement: Parent Quick-Action Button */}
           <button className="hidden sm:flex items-center gap-2.5 px-6 py-2.5 bg-google-gray-100/50 border border-google-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-google-gray-500 hover:bg-elite-blue hover:text-white hover:border-elite-blue transition-all group">
              <UserPlus className="w-3.5 h-3.5" />
              Request Leave
           </button>
           <button className="action-icon !w-10 !h-10">
             <Bell className="w-5 h-5" />
           </button>
           <button className="action-icon !w-10 !h-10">
             <HelpCircle className="w-5 h-5" />
           </button>
           <div className="h-6 w-[1px] bg-google-gray-200 mx-2" />
           <div className="flex items-center gap-3 hover:bg-white/50 p-1.5 pr-5 rounded-full transition-all cursor-pointer group shadow-sm bg-white/30 border border-white/60">
              <div className="w-10 h-10 bg-elite-blue rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                 <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[13px] font-black text-google-gray-900 leading-none">{student.name.split(' ')[0]}</span>
                 <span className="text-[9px] font-bold text-google-gray-400 uppercase tracking-widest mt-0.5">Class 3-A</span>
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
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-elite-blue/5 border border-elite-blue/10 rounded-full text-[10px] font-black uppercase tracking-widest text-elite-blue">
                     <Zap className="w-3 h-3" />
                     Student Overview
                  </div>
                  <h2 className="text-4xl font-extrabold text-google-gray-900 tracking-tighter leading-tight">Welcome, <span className="text-elite-blue">{student.name.split(' ')[0]}!</span></h2>
                  <p className="text-lg text-google-gray-500 font-medium tracking-tight">Here is an overview of your <span className="text-google-gray-900 font-bold">School Life</span> at Global Academy.</p>
               </div>
               <div className="flex items-center gap-4 px-6 py-4 glass-card shadow-elite-soft border-white/80">
                  <Calendar className="w-5 h-5 text-elite-blue" />
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-google-gray-400 uppercase tracking-widest leading-none mb-1">Academic Year</span>
                     <span className="text-base font-bold text-google-gray-800">2025-2026</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-google-gray-300 ml-2" />
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

            {/* UX Enhancement: Achievement Gallery */}
            <div className="mb-12 glass-card p-8 border-white/60 bg-gradient-to-br from-white to-google-gray-50">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-elite-amber/10 rounded-xl">
                     <Award className="w-6 h-6 text-elite-amber" />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-2xl font-bold text-google-gray-900 tracking-tight">Achievements</h3>
                     <span className="text-xs font-medium text-google-gray-400">Your Milestones & Rewards</span>
                  </div>
               </div>
               <div className="flex items-center gap-8 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                     { label: "Perfect Attendance", icon: CheckCircle, color: "text-elite-emerald", bg: "bg-elite-emerald/10" },
                     { label: "Top Performer", icon: Star, color: "text-elite-amber", bg: "bg-elite-amber/10" },
                     { label: "Math Wizard", icon: Zap, color: "text-elite-blue", bg: "bg-elite-blue/10" },
                     { label: "7 Day Streak", icon: Flame, color: "text-elite-rose", bg: "bg-elite-rose/10" },
                  ].map((badge, idx) => (
                     <div key={idx} className="flex flex-col items-center gap-3 min-w-[120px] group cursor-pointer">
                        <div className={cn("w-20 h-20 rounded-[32px] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg", badge.bg)}>
                           <badge.icon className={cn("w-10 h-10", badge.color)} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-google-gray-500 text-center leading-tight">{badge.label}</span>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2 space-y-8">
                <div className="glass-card bg-white/40 overflow-hidden border-white/60">
                   <div className="p-8 border-b border-google-gray-100/50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-elite-blue/10 rounded-xl shadow-inner">
                            <Target className="w-6 h-6 text-elite-blue" />
                         </div>
                         <div className="flex flex-col">
                            <h3 className="text-2xl font-bold text-google-gray-900 tracking-tight">Today's Classes</h3>
                            <span className="text-xs font-medium text-google-gray-400">Regular Schedule: Class 3-A</span>
                         </div>
                      </div>
                      <Link href="/student/timetable" className="px-6 py-2.5 bg-white border border-google-gray-100 rounded-xl text-xs font-black uppercase tracking-widest text-elite-blue hover:bg-elite-blue hover:text-white hover:shadow-lg transition-all">Full View</Link>
                   </div>
                   <div className="p-3">
                      {timetable.length > 0 ? (
                        <div className="space-y-3">
                          {timetable.map((period) => (
                            <div
                              key={period.id}
                              className="group flex items-center gap-8 p-6 rounded-2xl hover:bg-white transition-all duration-500 cursor-pointer border border-transparent hover:border-google-gray-100 hover:shadow-elite-soft"
                            >
                              <div className="w-16 h-16 rounded-2xl bg-google-gray-900 text-white flex flex-col items-center justify-center shadow-lg transition-all group-hover:scale-105 group-hover:-rotate-3">
                                <span className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-0.5">Period</span>
                                <span className="text-2xl font-black">{period.periodNumber}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="text-xl font-bold text-google-gray-900 group-hover:text-elite-blue transition-colors">
                                    {getSubjectName(period.subjectId)}
                                  </h4>
                                  <span className="text-[9px] font-black bg-elite-blue/10 text-elite-blue px-2 py-0.5 rounded-full uppercase tracking-widest">Live</span>
                                </div>
                                <div className="flex items-center gap-5 mt-1 text-sm font-bold text-google-gray-400">
                                   <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 opacity-50" /> 09:00 — 10:00</span>
                                   <span className="text-google-gray-600">Prof. Alexander Higgins</span>
                                </div>
                              </div>
                              <button className="w-10 h-10 rounded-xl bg-google-gray-50 flex items-center justify-center text-google-gray-300 group-hover:bg-elite-blue group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                                 <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-32 flex flex-col items-center justify-center text-center">
                           <Waves className="w-12 h-12 text-google-gray-200 mb-6 animate-bounce" />
                           <p className="text-sm font-black uppercase tracking-[0.3em] text-google-gray-400">Quiet Period • No Sessions Active</p>
                        </div>
                      )}
                   </div>
                </div>

                <div className="glass-card p-10 bg-google-gray-900 text-white border-none shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-elite-blue/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                   
                   <div className="relative z-10 flex items-center justify-between mb-10">
                      <div className="flex items-center gap-5">
                         <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xl border border-white/20 shadow-xl">
                            <DollarSign className="w-6 h-6 text-elite-blue" />
                         </div>
                         <div className="flex flex-col">
                            <h3 className="text-2xl font-bold tracking-tight">Fee Management</h3>
                            <span className="text-xs font-medium text-white/50">Current Academic Year</span>
                         </div>
                      </div>
                      <span className="text-[10px] font-black text-white/40 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-[0.2em]">Online</span>
                   </div>
                   
                   <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                         <p className="text-[10px] font-black text-white/40 uppercase mb-3 tracking-[0.2em]">Total</p>
                         <p className="text-2xl font-black">₹{feeStatus.total.toLocaleString()}</p>
                      </div>
                      <div className="p-6 bg-elite-emerald/10 rounded-2xl border border-elite-emerald/20">
                         <p className="text-[10px] font-black text-elite-emerald uppercase mb-3 tracking-[0.2em]">Paid</p>
                         <p className="text-2xl font-black text-elite-emerald">₹{feeStatus.paid.toLocaleString()}</p>
                      </div>
                      <div className="p-6 bg-elite-rose/10 rounded-2xl border border-elite-rose/20">
                         <p className="text-[10px] font-black text-elite-rose uppercase mb-3 tracking-[0.2em]">Pending</p>
                         <p className="text-2xl font-black text-elite-rose">₹{feeStatus.due.toLocaleString()}</p>
                      </div>
                   </div>

                   {!feeStatus.isPaid && (
                      <button className="relative z-10 mt-10 w-full py-5 bg-elite-blue text-white text-xs font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-elite-blue transition-all duration-500 shadow-xl active:scale-95 flex items-center justify-center gap-3">
                         <ShieldCheck className="w-4 h-4" />
                         Pay Online Now
                      </button>
                   )}
                </div>
              </div>

              {/* Sidebar Infrastructure Quick Links */}
              <div className="space-y-8">
                {/* UX Enhancement: Deadlines Sidebar */}
                <div className="glass-card p-8 border-white/80">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-elite-rose/10 rounded-xl">
                         <Clock className="w-5 h-5 text-elite-rose" />
                      </div>
                      <div className="flex flex-col">
                         <h3 className="text-xl font-bold text-google-gray-900 tracking-tight">Due Soon</h3>
                         <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-widest">Deadlines</span>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="p-5 bg-google-gray-50 rounded-2xl border border-transparent hover:border-google-gray-100 hover:bg-white transition-all cursor-pointer group shadow-sm bg-white/50 border border-white/60">
                         <p className="text-[9px] font-black text-elite-rose uppercase mb-2 tracking-widest">Tonight</p>
                         <h4 className="text-base font-bold text-google-gray-900 mb-1 leading-snug">Math Worksheet</h4>
                         <p className="text-[12px] font-medium text-google-gray-500">Solve equations 1-10.</p>
                      </div>
                      <div className="p-5 bg-google-gray-50 rounded-2xl border border-transparent hover:border-google-gray-100 hover:bg-white transition-all cursor-pointer group shadow-sm">
                         <p className="text-[9px] font-black text-google-gray-400 uppercase mb-2 tracking-widest">In 2 Days</p>
                         <h4 className="text-base font-bold text-google-gray-900 mb-1 leading-snug">History Project</h4>
                         <p className="text-[12px] font-medium text-google-gray-500">Medieval India Architecture.</p>
                      </div>
                   </div>
                </div>

                <div className="glass-card p-8 pb-3 border-white/80">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-elite-emerald/10 rounded-xl">
                         <TrendingUp className="w-5 h-5 text-elite-emerald" />
                      </div>
                      <div className="flex flex-col">
                         <h3 className="text-xl font-bold text-google-gray-900 tracking-tight">Quick Access</h3>
                         <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-widest">Controls</span>
                      </div>
                   </div>
                   <div className="space-y-1.5">
                      {quickLinks.map((link, idx) => (
                        <Link href={link.href} key={idx}>
                          <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-google-gray-50 transition-all duration-500 border border-transparent hover:border-google-gray-100">
                             <div className="flex items-center gap-5">
                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm", link.bg)}>
                                   <link.icon className={cn("w-5 h-5 transition-colors", link.color)} />
                                </div>
                                <span className="text-sm font-black text-google-gray-700 tracking-tight group-hover:text-elite-blue transition-colors uppercase">{link.label}</span>
                             </div>
                             <ChevronRight className="w-5 h-5 text-google-gray-200 group-hover:text-elite-blue transition-all group-hover:translate-x-1" />
                          </div>
                        </Link>
                      ))}
                   </div>
                </div>

                {transport && (
                   <div className="glass-card p-8 border-elite-amber/20 bg-elite-amber/5">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="p-3 bg-elite-amber/10 rounded-xl shadow-lg shadow-elite-amber/5">
                            <Bus className="w-6 h-6 text-elite-amber" />
                         </div>
                         <div className="flex flex-col">
                            <h3 className="text-xl font-bold text-google-gray-900 tracking-tight">Transport</h3>
                            <span className="text-[10px] font-bold text-elite-amber uppercase tracking-widest">Active Tracking</span>
                         </div>
                      </div>
                      <div className="space-y-6">
                         <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-black text-google-gray-400 uppercase tracking-widest">Bus Number</span>
                            <div className="flex items-center justify-between">
                               <span className="text-lg font-black text-google-gray-900">BR-01-EL-99</span>
                               <span className="px-2.5 py-0.5 bg-elite-emerald/10 text-elite-emerald text-[9px] font-black uppercase rounded-full tracking-widest animate-pulse">In Route</span>
                            </div>
                         </div>
                         <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-black text-google-gray-400 uppercase tracking-widest">Driver</span>
                            <span className="text-base font-bold text-google-gray-700">{transport.driverName}</span>
                         </div>
                         <button className="w-full py-4 bg-white border border-elite-amber/20 text-elite-amber text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-elite-amber hover:text-white transition-all shadow-sm">
                            View Live Map
                         </button>
                      </div>
                   </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
