"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Users,
  GraduationCap,
  Lock,
  User,
  ArrowRight,
  Menu,
  X,
  School,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSchoolStore } from "@/lib/store";

type AuthRole = "admin" | "teacher" | "student";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<AuthRole>("admin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const login = useSchoolStore((state) => state.login);

  const roles = [
    {
      id: "admin" as AuthRole,
      label: "Admin",
      icon: ShieldCheck,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      id: "teacher" as AuthRole,
      label: "Teacher",
      icon: Users,
      color: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600",
    },
    {
      id: "student" as AuthRole,
      label: "Student",
      icon: GraduationCap,
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(selectedRole);
      window.location.href = `/${selectedRole}`;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="lg:hidden fixed top-4 right-4 p-2 bg-white rounded-lg shadow-md z-50"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out p-6",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="text-lg font-bold text-gray-900">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Features
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-700">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <Users className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-gray-700">Teacher Portal</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <GraduationCap className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-700">Student Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <School className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            School Management
          </h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 border-2",
                    selectedRole === role.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center text-white",
                      role.color,
                    )}
                  >
                    <role.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      selectedRole === role.id
                        ? "text-blue-600"
                        : "text-gray-600",
                    )}
                  >
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Enter username"
                  defaultValue={
                    selectedRole === "admin"
                      ? "admin"
                      : selectedRole === "teacher"
                        ? "teacher"
                        : "student"
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  className="input pl-10"
                  placeholder="Enter password"
                  defaultValue="password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all",
                isSubmitting
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700",
              )}
            >
              {isSubmitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-700 text-center">
              <strong>Demo Mode:</strong> Click any role above and sign in to
              explore the dashboard.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          School Management System v2.0
        </p>
      </div>
    </div>
  );
}
