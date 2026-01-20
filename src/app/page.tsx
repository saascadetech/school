"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  BookOpen,
  DollarSign,
  Bus,
  Calendar,
  BarChart3,
  Zap,
} from "lucide-react";
import Footer from "@/components/Footer";

const features = [
  {
    icon: Users,
    title: "Student Management",
    description: "Track attendance, grades, and student progress in real-time",
  },
  {
    icon: BookOpen,
    title: "Teacher Portal",
    description: "Manage classes, assignments, and student performance",
  },
  {
    icon: DollarSign,
    title: "Fee Management",
    description: "Automated fee collection and payment tracking",
  },
  {
    icon: Bus,
    title: "Transport Tracking",
    description: "Real-time bus location and student pickup alerts",
  },
  {
    icon: Calendar,
    title: "Timetable Builder",
    description: "Create and manage class schedules effortlessly",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Comprehensive reports for informed decisions",
  },
];

const stats = [
  { value: "10K+", label: "Students" },
  { value: "500+", label: "Schools" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Modern School Management System
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Manage Your School
            <br />
            <span className="text-blue-600">Smarter, Not Harder</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            A complete school management solution for administrators, teachers,
            and students. Streamline attendance, fees, homework, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Start Free Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
            >
              View Features
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to manage every aspect of your school
              operations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Three Portals, One Platform
            </h2>
            <p className="text-lg text-gray-600">
              Tailored experiences for every user
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Admin */}
            <Link
              href="/admin"
              className="group card p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Administrator
              </h3>
              <p className="text-gray-600 mb-6">
                Complete control over school operations, staff management, and
                institutional settings.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                Access Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Teacher */}
            <Link
              href="/teacher"
              className="group card p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Teacher</h3>
              <p className="text-gray-600 mb-6">
                Manage classes, take attendance, assign homework, and track
                student progress.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                Access Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Student */}
            <Link
              href="/student"
              className="group card p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Student</h3>
              <p className="text-gray-600 mb-6">
                View assignments, check attendance, track grades, and stay
                updated on school activities.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                Access Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of schools already using SchoolFlow
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Start Free Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
