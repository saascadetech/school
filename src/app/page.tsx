"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import { 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Zap,
  Globe,
  Command,
  HelpCircle,
  Bell,
  Sparkles,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const roles = [
  {
    role: "student" as Role,
    title: "Student Dashboard",
    description: "Manage your classes, homework, and performance with a simple, easy-to-use interface.",
    icon: GraduationCap,
    color: "from-elite-blue to-elite-indigo",
    glow: "shadow-elite-blue-glow",
    stats: "1,200+ Students",
    badge: "Students"
  },
  {
    role: "teacher" as Role,
    title: "Teacher Portal",
    description: "Plan lessons, mark attendance, and track student growth all in one high-quality workspace.",
    icon: Zap,
    color: "from-elite-emerald to-blue-500",
    glow: "shadow-emerald-500/20",
    stats: "Teacher Access"
  },
  {
    role: "admin" as Role,
    title: "Admin Office",
    description: "Oversee school operations, manage fees, and handle staff permissions from a central dashboard.",
    icon: ShieldCheck,
    color: "from-elite-rose to-elite-indigo",
    glow: "shadow-rose-500/20",
    stats: "School Management"
  },
];

export default function HubPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleEnter = (role: Role) => {
    window.location.href = `/${role}`;
  };

  return (
    <div className="min-h-screen bg-google-gray-50 flex flex-col relative overflow-hidden">
      {/* Mesh Background Interaction */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-elite-blue/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-elite-indigo/10 blur-[180px] rounded-full" />
      </div>

      <header className="h-20 px-6 md:px-10 flex items-center justify-between bg-white/40 backdrop-blur-3xl border-b border-white/60 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer">
             <div className="w-12 h-12 bg-google-gray-900 rounded-xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                <Command className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-google-gray-900 leading-none">GLOBAL ACADEMY</span>
                <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-[0.2em] mt-1">School Hub</span>
             </div>
          </div>
          
          <nav className="hidden xl:flex items-center gap-10">
             <a href="#" className="text-[13px] font-black uppercase tracking-widest text-google-gray-500 hover:text-elite-blue transition-colors">Documentation</a>
             <a href="#" className="text-[13px] font-black uppercase tracking-widest text-google-gray-500 hover:text-elite-blue transition-colors">Network Status</a>
          </nav>
        </div>

        <div className="flex items-center gap-5">
           <div className="hidden sm:flex items-center gap-2.5 px-5 py-2 bg-white/50 border border-white/80 rounded-full text-[10px] font-black uppercase tracking-widest text-google-gray-600 shadow-sm">
              <span className="w-2 h-2 bg-elite-emerald rounded-full animate-pulse" />
              Service Status Online
           </div>
           <button className="action-icon !w-10 !h-10">
             <Bell className="w-5 h-5" />
           </button>
           <Link href="/login" className="px-8 py-3 bg-google-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-elite-blue transition-all shadow-xl active:scale-95">
              Secure Auth
           </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <div className="layout-container section-gap">
          {/* Hero Section with Massive Spacing */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
             <div className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-elite-blue/5 border border-elite-blue/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-elite-blue mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Next-Gen School System
             </div>
             <h2 className="text-hero">
                The modern way to <span className="text-elite-blue">manage your school.</span>
             </h2>
             <p className="text-xl text-google-gray-500 font-medium leading-relaxed tracking-tight max-w-3xl mx-auto">
                A simple, elegant platform designed to help teachers, students, and principals focus on what matters most: education.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {roles.map((item) => (
              <div 
                key={item.role} 
                className={cn(
                  "glass-card p-10 flex flex-col group cursor-pointer relative overflow-hidden h-auto min-h-[460px]",
                  selectedRole === item.role && "ring-4 ring-elite-blue/20"
                )}
                onMouseEnter={() => setSelectedRole(item.role)}
                onMouseLeave={() => setSelectedRole(null)}
                onClick={() => handleEnter(item.role)}
              >
                {/* Background Glow Effect */}
                <div className={cn(
                  "absolute -top-32 -right-32 w-80 h-80 blur-[100px] rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-40",
                  item.color
                )} />

                <div className="flex justify-between items-start mb-12">
                   <div className={cn(
                     "w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br",
                     item.color
                   )}>
                      <item.icon className="w-10 h-10" />
                   </div>
                   {item.badge && (
                     <span className="px-4 py-1.5 bg-elite-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                        {item.badge}
                     </span>
                   )}
                </div>

                <div className="flex flex-col gap-4">
                   <h3 className="text-2xl font-bold text-google-gray-900 group-hover:text-elite-blue transition-colors">
                      {item.title}
                   </h3>
                   <p className="text-[15px] text-google-gray-500 font-medium leading-relaxed tracking-tight mb-2">
                      {item.description}
                   </p>
                </div>

                <div className="mt-auto space-y-8">
                   <div className="flex items-center gap-3 text-[12px] font-black text-google-gray-400 uppercase tracking-[0.2em]">
                      <Globe className="w-5 h-5" />
                      {item.stats}
                   </div>
                   <div className="w-full h-16 bg-google-gray-100/50 rounded-[24px] flex items-center justify-between px-8 hover:bg-elite-blue hover:text-white hover:shadow-2xl transition-all duration-300">
                      <span className="text-[13px] font-black uppercase tracking-widest">Go to Dashboard</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Elite Footer Section */}
          <footer className="mt-24 pt-16 border-t border-google-gray-200">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                <div className="lg:col-span-2 space-y-8">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-google-gray-900 rounded-xl flex items-center justify-center">
                         <Command className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-black tracking-tighter">GLOBAL ACADEMY</span>
                   </div>
                   <p className="text-lg text-google-gray-500 font-medium leading-relaxed max-w-md tracking-tight">
                      Designed for modern education. Focused on students and teachers.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-12 lg:col-span-2">
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-google-gray-400 uppercase tracking-[0.3em]">School</h4>
                      <ul className="space-y-4 text-sm font-bold text-google-gray-700">
                         <li><a href="#" className="hover:text-elite-blue transition-colors tracking-tight">Admissions</a></li>
                         <li><a href="#" className="hover:text-elite-blue transition-colors tracking-tight">Classes</a></li>
                         <li><a href="#" className="hover:text-elite-blue transition-colors tracking-tight">Events</a></li>
                      </ul>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-google-gray-400 uppercase tracking-[0.3em]">Resources</h4>
                      <ul className="space-y-4 text-sm font-bold text-google-gray-700">
                         <li><a href="#" className="hover:text-elite-blue transition-colors tracking-tight">Operational Docs</a></li>
                         <li><a href="#" className="hover:text-elite-blue transition-colors tracking-tight">Security Audit</a></li>
                         <li><a href="#" className="hover:text-elite-blue transition-colors tracking-tight">Help Center</a></li>
                      </ul>
                   </div>
                </div>
             </div>
             <div className="mt-16 pb-12 flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-black text-google-gray-400 uppercase tracking-[0.25em] border-t border-google-gray-200 pt-10">
                <span>© 2026 Global Academy Group</span>
                <div className="flex items-center gap-8">
                   <a href="#" className="hover:text-elite-blue transition-colors">Privacy Policy</a>
                   <a href="#" className="hover:text-elite-blue transition-colors">Terms of Use</a>
                </div>
             </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
