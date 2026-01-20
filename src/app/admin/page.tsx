"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, getAllClassSyllabusProgress } from "@/lib/data";
import {
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  Bus,
  TrendingUp,
  LayoutGrid,
  ShieldCheck,
  MoreHorizontal,
  Plus,
  ArrowRight,
  Target,
  FileText,
  Activity,
  UserCheck,
  Globe,
  Zap,
  Command,
  HelpCircle,
  Bell,
  Search,
  UserCircle,
  AlertOctagon
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminHomePage() {
  const [role, setRole] = useState<Role>("admin");

  const stats = [
    { label: "Total Classes", value: 42, icon: LayoutGrid, color: "text-elite-blue", bg: "bg-elite-blue/10", trend: "School-Wide" },
    { label: "Course Progress", value: "88%", icon: BookOpen, color: "text-elite-emerald", bg: "bg-elite-emerald/10", trend: "Term 1" },
    { label: "Fee Collection", value: "Optimal", icon: DollarSign, color: "text-elite-amber", bg: "bg-elite-amber/10", trend: "Financially Healthy" },
    { label: "School Status", value: "Good", icon: ShieldCheck, color: "text-elite-rose", bg: "bg-elite-rose/10", trend: "All Sync Active" },
  ];

  return (
    <div className="min-h-screen bg-google-gray-50 flex flex-col relative overflow-hidden">
      {/* Mesh Background Interop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] bg-elite-blue/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-elite-rose/5 blur-[120px] rounded-full" />
      </div>

      <header className="h-20 px-6 md:px-10 flex items-center justify-between bg-white/40 backdrop-blur-3xl border-b border-white/60 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer">
             <div className="w-12 h-12 bg-google-gray-900 rounded-xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                <Command className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-google-gray-900 leading-none">ADMIN OFFICE</span>
                <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-elite-rose rounded-full animate-pulse" />
                   Management Active
                </span>
             </div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-12 hidden lg:block">
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-google-gray-400 group-focus-within:text-elite-blue transition-colors" />
              <input 
                 type="text" 
                 placeholder="Search students, staff, or records..." 
                 className="w-full bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold tracking-tight focus:ring-4 focus:ring-elite-blue/10 transition-all outline-none shadow-sm"
              />
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
              <div className="w-10 h-10 bg-google-gray-900 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                 <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[13px] font-black text-google-gray-900 leading-none">Principal</span>
                 <span className="text-[9px] font-bold text-google-gray-400 uppercase tracking-widest mt-0.5">Admin Access</span>
              </div>
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <Sidebar role={role} onRoleChange={setRole} />

        <main className="flex-1 overflow-y-auto">
          <div className="layout-container section-gap">
            {/* Command Header with Elite Spacing */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-google-gray-100">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-elite-rose/5 border border-elite-rose/10 rounded-full text-[10px] font-black uppercase tracking-widest text-elite-rose">
                     <Zap className="w-3 h-3" />
                     Administration
                  </div>
                  <h2 className="text-4xl font-extrabold text-google-gray-900 tracking-tighter leading-tight">School <span className="text-elite-blue">Management.</span></h2>
                  <p className="text-lg text-google-gray-500 font-medium tracking-tight max-w-2xl leading-relaxed">Admin panel for managing teachers, students, and daily school activities efficiently.</p>
               </div>
               <div className="flex gap-4">
                  {/* UX Enhancement: Emergency Alert Button */}
                  <button className="px-8 py-3.5 bg-elite-rose text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-google-gray-900 transition-all shadow-xl active:scale-95 flex items-center gap-3 border border-elite-rose/20">
                     <AlertOctagon className="w-4 h-4 animate-pulse" />
                     Emergency Alert
                  </button>
                  <button className="px-8 py-3.5 bg-elite-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg transition-all active:scale-95 flex items-center gap-3">
                     <Plus className="w-4 h-4" />
                     Add New Profile
                  </button>
               </div>
            </div>

            {/* Elite Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card p-8 flex flex-col gap-6 group scale-hover">
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
                <div id="curriculum" className="glass-card bg-white/40 overflow-hidden border-white/60">
                   <div className="p-8 border-b border-google-gray-100/50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-elite-indigo/10 rounded-xl shadow-inner">
                            <BookOpen className="w-6 h-6 text-elite-indigo" />
                         </div>
                         <div className="flex flex-col">
                            <h3 className="text-2xl font-bold text-google-gray-900 tracking-tight">Curriculum Pulse</h3>
                            <span className="text-xs font-medium text-google-gray-400">Subject-wise Syllabus Completion</span>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <Link href="/admin/reports" className="px-5 py-2.5 bg-white border border-google-gray-100 rounded-xl text-xs font-black uppercase tracking-widest text-elite-blue hover:bg-elite-blue hover:text-white transition-all shadow-sm">Detailed Audit</Link>
                      </div>
                   </div>
                   <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {getAllClassSyllabusProgress().map((classData) => (
                         <div key={classData.classId} className="space-y-6 p-6 rounded-2xl bg-white/50 border border-white shadow-sm hover:shadow-md transition-all group/class">
                            <div className="flex items-center justify-between mb-2">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-google-gray-900 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-lg group-hover/class:scale-110 transition-transform">
                                     {classData.className.split(' ')[1]}
                                  </div>
                                  <span className="text-lg font-bold text-google-gray-900 group-hover/class:text-elite-blue transition-colors">{classData.className}</span>
                               </div>
                               <div className="flex flex-col items-end">
                                  <span className="text-xs font-black text-google-gray-400 uppercase tracking-widest">Efficiency</span>
                                  <span className="text-sm font-black text-elite-blue">{(classData.subjects.reduce((acc, s) => acc + s.progress, 0) / classData.subjects.length).toFixed(0)}%</span>
                               </div>
                            </div>
                            
                            <div className="space-y-4">
                               {classData.subjects.map((subject) => (
                                  <div key={subject.subjectId} className="space-y-2">
                                     <div className="flex justify-between items-center px-1">
                                        <span className="text-[11px] font-bold text-google-gray-600">{subject.name}</span>
                                        <span className={cn(
                                           "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                                           subject.progress > 80 ? "bg-elite-emerald/10 text-elite-emerald" : 
                                           subject.progress > 50 ? "bg-elite-amber/10 text-elite-amber" : 
                                           "bg-elite-rose/10 text-elite-rose"
                                        )}>
                                           {subject.progress}%
                                        </span>
                                     </div>
                                     <div className="w-full h-2 bg-google-gray-100 rounded-full overflow-hidden border border-white/50">
                                        <div 
                                           className={cn(
                                              "h-full rounded-full transition-all duration-1000 ease-out relative shadow-sm",
                                              subject.progress > 80 ? "bg-elite-emerald" : 
                                              subject.progress > 50 ? "bg-elite-amber" : 
                                              "bg-elite-rose"
                                           )}
                                           style={{ width: `${subject.progress}%` }}
                                        >
                                           <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse" />
                                        </div>
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* UX Enhancement: Fee Collection Velocity Graph */}
                <div className="glass-card p-10 bg-white border-white/60 group">
                   <div className="flex justify-between items-center mb-10">
                      <div className="flex items-center gap-5">
                         <div className="p-3 bg-elite-amber/10 rounded-xl">
                            <DollarSign className="w-6 h-6 text-elite-amber" />
                         </div>
                         <div className="flex flex-col">
                            <h3 className="text-2xl font-bold text-google-gray-900 tracking-tight">Financial Velocity</h3>
                            <span className="text-xs font-medium text-google-gray-400">Monthly Fee Collection Trends</span>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <div className="px-3 py-1 bg-google-gray-50 rounded-lg text-[10px] font-black uppercase tracking-widest text-google-gray-400">Current Qtr</div>
                      </div>
                   </div>
                   
                   <div className="h-64 flex items-end justify-between gap-4">
                      {[30, 45, 25, 60, 80, 55, 90, 40, 70, 85, 95, 100].map((val, i) => (
                         <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar">
                            <div className="w-full relative bg-google-gray-50 rounded-t-xl transition-all duration-500 hover:bg-elite-amber group-hover:shadow-lg" style={{ height: `${val}%` }}>
                               <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-google-gray-900 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                  {val}%
                               </div>
                            </div>
                            <span className="text-[9px] font-bold text-google-gray-400 uppercase tracking-tighter">M{i+1}</span>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="glass-card p-10 bg-google-gray-900 text-white border-none shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-elite-blue/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                   
                   <div className="relative z-10 flex items-center justify-between mb-10">
                      <div className="flex items-center gap-5">
                         <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xl border border-white/20 shadow-xl">
                            <Bus className="w-6 h-6 text-elite-blue" />
                         </div>
                         <div className="flex flex-col">
                            <h3 className="text-2xl font-bold tracking-tight">School Transport</h3>
                            <span className="text-xs font-medium text-white/50">Bus Tracking and Logistics</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                         <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Active Buses</p>
                            <Target className="w-4 h-4 text-elite-rose" />
                         </div>
                         <p className="text-3xl font-black mb-1">12</p>
                         <p className="text-xs font-bold text-white/60">Buses active across school routes.</p>
                      </div>
                      <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                         <div className="flex justify-between items-start mb-6">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Efficiency</p>
                            <Zap className="w-4 h-4 text-elite-amber" />
                         </div>
                         <p className="text-3xl font-black mb-1">84%</p>
                         <p className="text-xs font-bold text-white/60">Operational status registered.</p>
                      </div>
                   </div>

                   <button className="relative z-10 mt-10 w-full py-5 bg-white text-google-gray-900 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-elite-blue hover:text-white transition-all duration-500 shadow-xl active:scale-95 flex items-center justify-center gap-3">
                      View Transit Map
                      <ArrowRight className="w-4 h-4" />
                   </button>
                </div>

                {/* UX Enhancement: Substitution Hub */}
                <div className="glass-card p-10 bg-white border-white/60 group">
                   <div className="flex justify-between items-center mb-10">
                      <div className="flex items-center gap-5">
                         <div className="p-3 bg-elite-rose/10 rounded-xl">
                            <UserCheck className="w-6 h-6 text-elite-rose" />
                         </div>
                         <div className="flex flex-col">
                            <h3 className="text-2xl font-bold text-google-gray-900 tracking-tight">Substitution Hub</h3>
                            <span className="text-xs font-medium text-google-gray-400">Manage Faculty Absences & Substitutes</span>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <div className="px-3 py-1 bg-elite-rose/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-elite-rose">2 Pending Requests</div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-6 bg-google-gray-50 rounded-2xl border border-transparent hover:border-google-gray-100 transition-all group/sub">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-google-gray-200 rounded-full overflow-hidden shadow-inner">
                               <div className="w-full h-full bg-google-gray-900 flex items-center justify-center text-white font-black">MS</div>
                            </div>
                            <div>
                               <h4 className="text-base font-bold text-google-gray-900">Mrs. Smith</h4>
                               <p className="text-xs font-medium text-google-gray-400 uppercase tracking-widest">Sick Leave • Class 3-A</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end mr-4">
                               <span className="text-[10px] font-black text-google-gray-400 uppercase tracking-widest">Assign Substitute</span>
                               <span className="text-sm font-bold text-elite-blue">Mr. Khanna Available</span>
                            </div>
                            <button className="px-6 py-2.5 bg-elite-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all active:scale-95">
                               Confirm Sub
                            </button>
                         </div>
                      </div>

                      <div className="flex items-center justify-between p-6 bg-google-gray-50 rounded-2xl border border-transparent hover:border-google-gray-100 transition-all opacity-60">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-google-gray-200 rounded-full overflow-hidden shadow-inner">
                               <div className="w-full h-full bg-google-gray-400 flex items-center justify-center text-white font-black">RK</div>
                            </div>
                            <div>
                               <h4 className="text-base font-bold text-google-gray-900">Mr. Sharma</h4>
                               <p className="text-xs font-medium text-google-gray-400 uppercase tracking-widest">Personal Leave • Class 5-C</p>
                            </div>
                         </div>
                         <button className="px-6 py-2.5 bg-google-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest opacity-50 cursor-not-allowed">
                            Assigned: Mrs. Gupta
                         </button>
                      </div>
                   </div>
                </div>
              </div>

              {/* Sidebar Critical Notifications & Ops Center */}
              <div className="space-y-8">
                {/* UX Enhancement: Staff Availability Widget */}
                <div className="glass-card p-8 border-white/80 bg-gradient-to-br from-white to-google-gray-50">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-elite-blue/10 rounded-xl">
                         <UserCheck className="w-5 h-5 text-elite-blue" />
                      </div>
                      <div className="flex flex-col">
                         <h3 className="text-xl font-bold text-google-gray-900 tracking-tight">Staffing</h3>
                         <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-widest">Attendance Status</span>
                      </div>
                   </div>
                   
                   <div className="flex justify-center mb-8 relative">
                      <svg className="w-40 h-40 transform -rotate-90">
                         <circle cx="80" cy="80" r="70" className="stroke-google-gray-100 fill-none" strokeWidth="12" />
                         <circle cx="80" cy="80" r="70" className="stroke-elite-blue fill-none transition-all duration-1000" strokeWidth="12" strokeDasharray="440" strokeDashoffset="44" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-3xl font-black text-google-gray-900">90%</span>
                         <span className="text-[9px] font-black text-google-gray-400 uppercase tracking-widest">Available</span>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-google-gray-100 shadow-sm">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-elite-emerald rounded-full" />
                            <span className="text-[11px] font-bold text-google-gray-600">On-Duty Staff</span>
                         </div>
                         <span className="text-sm font-black text-google-gray-900">84</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-google-gray-100 shadow-sm">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-elite-rose rounded-full" />
                            <span className="text-[11px] font-bold text-google-gray-600">On Leave</span>
                         </div>
                         <span className="text-sm font-black text-google-gray-900">06</span>
                      </div>
                   </div>
                </div>

                <div className="glass-card p-8 border-white/80">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-elite-rose/10 rounded-xl">
                         <ShieldCheck className="w-5 h-5 text-elite-rose" />
                      </div>
                      <div className="flex flex-col">
                         <h3 className="text-xl font-bold text-google-gray-900 tracking-tight">Security</h3>
                         <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-widest">Active Monitor</span>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="p-5 bg-google-gray-50 rounded-2xl border border-transparent hover:border-google-gray-100 transition-all cursor-pointer group shadow-sm bg-white/50 border border-white/60">
                         <p className="text-[9px] font-black text-white bg-elite-rose px-2.5 py-0.5 rounded-full uppercase mb-3 tracking-widest w-fit shadow-lg">Immediate</p>
                         <h4 className="text-base font-bold text-google-gray-900 mb-1 leading-snug">Fee Discrepancy Alert</h4>
                         <p className="text-[12px] font-medium text-google-gray-500 mt-2">Review required in Section B-01.</p>
                      </div>
                      <div className="p-5 bg-google-gray-50 rounded-2xl border border-transparent hover:border-google-gray-100 hover:bg-white transition-all cursor-pointer group shadow-sm">
                         <p className="text-[9px] font-black text-google-gray-400 uppercase mb-3 tracking-widest">Attendance Status</p>
                         <h4 className="text-base font-bold text-google-gray-900 mb-1 leading-snug">Attendance Recorded</h4>
                         <div className="flex items-center gap-2 mt-3 text-[10px] font-black text-elite-emerald bg-elite-emerald/5 w-fit px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                            Verified Access
                         </div>
                      </div>
                   </div>
                   <button className="w-full mt-8 py-4 bg-google-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-elite-blue transition-all">
                      View Activity Logs
                   </button>
                </div>

                <div className="glass-card p-8 bg-gradient-to-br from-elite-rose to-elite-indigo text-white border-none shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                         <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/20">
                            <Zap className="w-5 h-5 text-white" />
                         </div>
                         <span className="text-sm font-black text-white tracking-widest uppercase">Admin Insights</span>
                      </div>
                      <p className="text-xl font-bold leading-relaxed mb-8 tracking-tight italic">
                         &quot;School efficiency has reached an <span className="underline decoration-white decoration-2 underline-offset-4">all-time high</span> of 94.2%.&quot;
                      </p>
                      <button className="w-full py-3.5 bg-white text-elite-rose text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-google-gray-100 transition-all shadow-xl">
                         View Analytics
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
