"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Zap, 
  GraduationCap, 
  Command, 
  ArrowRight, 
  Lock,
  User,
  Sparkles,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

type AuthRole = "admin" | "teacher" | "student";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<AuthRole>("admin");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    { id: "admin", label: "Principal", icon: ShieldCheck, color: "text-elite-rose", bg: "bg-elite-rose/10" },
    { id: "teacher", label: "Faculty", icon: Zap, color: "text-elite-emerald", bg: "bg-elite-emerald/10" },
    { id: "student", label: "Student", icon: GraduationCap, color: "text-elite-blue", bg: "bg-elite-blue/10" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate login delay
    setTimeout(() => {
      localStorage.setItem("school_auth_role", selectedRole);
      window.location.href = `/${selectedRole}`;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-google-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-elite-blue/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-elite-indigo/10 blur-[180px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card p-10 bg-white shadow-2xl border-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-elite-blue/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-elite-blue/20 transition-all duration-1000" />
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-google-gray-900 rounded-[20px] flex items-center justify-center mb-6 shadow-xl animate-float">
              <Command className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-elite-blue/5 border border-elite-blue/10 rounded-full text-[9px] font-black uppercase tracking-widest text-elite-blue">
                <Lock className="w-3 h-3" />
                Secure Access
              </div>
              <h1 className="text-3xl font-black text-google-gray-900 tracking-tighter">Login to Academy.</h1>
              <p className="text-sm font-medium text-google-gray-500 tracking-tight">Access your personalized school dashboard.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-google-gray-400 uppercase tracking-[0.2em] ml-1">Select Persona</p>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id as AuthRole)}
                    className={cn(
                      "p-4 rounded-2xl flex flex-col items-center gap-3 transition-all border-2",
                      selectedRole === r.id 
                        ? "bg-white border-elite-blue shadow-elite-soft ring-4 ring-elite-blue/5" 
                        : "bg-google-gray-50 border-transparent text-google-gray-400 hover:bg-white hover:border-google-gray-200"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", selectedRole === r.id ? r.bg : "bg-google-gray-100")}>
                      <r.icon className={cn("w-5 h-5", selectedRole === r.id ? r.color : "text-google-gray-400")} />
                    </div>
                    <span className={cn("text-[9px] font-black uppercase tracking-widest", selectedRole === r.id ? "text-google-gray-900" : "text-google-gray-400")}>
                      {r.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-google-gray-400 transition-colors group-focus-within:text-elite-blue" />
                <input 
                  type="text" 
                  placeholder="Username or ID" 
                  className="w-full bg-google-gray-50 border border-transparent rounded-xl py-3.5 pl-12 pr-6 text-sm font-bold tracking-tight focus:bg-white focus:ring-4 focus:ring-elite-blue/10 focus:border-elite-blue/30 transition-all outline-none"
                  defaultValue={selectedRole === 'admin' ? 'principal_lead' : selectedRole === 'teacher' ? 'mrs_smith' : 'aarav_sharma'}
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-google-gray-400 transition-colors group-focus-within:text-elite-blue" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-google-gray-50 border border-transparent rounded-xl py-3.5 pl-12 pr-6 text-sm font-bold tracking-tight focus:bg-white focus:ring-4 focus:ring-elite-blue/10 focus:border-elite-blue/30 transition-all outline-none"
                  defaultValue="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95",
                  isSubmitting ? "bg-google-gray-200 text-google-gray-400 cursor-not-allowed" : "bg-google-gray-900 text-white hover:bg-elite-blue"
                )}
              >
                {isSubmitting ? "Authenicating..." : (
                  <>
                    Initialize Session
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-google-gray-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-google-gray-400 uppercase tracking-widest">Global Academy Node B-1</span>
            <div className="flex items-center gap-4 text-google-gray-400">
              <ShieldCheck className="w-4 h-4" />
              <Globe className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center animate-pulse">
          <p className="text-[10px] font-black text-google-gray-400 uppercase tracking-[0.3em]">System Health: Optimal</p>
        </div>
      </div>
    </div>
  );
}
