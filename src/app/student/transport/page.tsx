"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Role, getStudent, getStudentTransport } from "@/lib/data";
import { ArrowLeft, Bus, MapPin, Phone, User, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function StudentTransportPage() {
  const [role, setRole] = useState<Role>("student");
  const student = getStudent("stud-1");
  const transport = getStudentTransport("stud-1");

  if (!transport) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role={role} onRoleChange={setRole} />

        <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
          <div className="p-4 lg:p-8">
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Transport</h1>
            </div>

            <Card>
              <CardBody className="text-center py-12">
                <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Transport Assigned
                </h3>
                <p className="text-gray-500">
                  Your child is not assigned to any transport route.
                </p>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Transport Details
            </h1>
            <p className="text-gray-500 mt-1">
              View your transport information
            </p>
          </div>

          {/* Route Info */}
          <Card className="mb-6">
            <CardBody>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-[#1e3a5f] text-white">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Route</p>
                  <p className="text-xl font-bold text-gray-900">
                    {transport.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-gray-500">Pickup Point</span>
                  </div>
                  <p className="font-medium text-gray-900">
                    {transport.pickupPoint}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-gray-500">Drop Point</span>
                  </div>
                  <p className="font-medium text-gray-900">
                    {transport.dropPoint}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Vehicle Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-4">
                <div className="p-3 rounded-lg bg-white">
                  <Bus className="w-6 h-6 text-[#1e3a5f]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {transport.vehicleNumber}
                  </p>
                  <p className="text-sm text-gray-500">Vehicle Number</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Driver Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Driver Details</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transport.driverName}
                    </p>
                    <p className="text-sm text-gray-500">Driver</p>
                  </div>
                </div>
                <a
                  href={`tel:${transport.driverPhone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d5a8a] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {transport.driverPhone}
                </a>
              </div>
            </CardBody>
          </Card>

          {/* Status */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Bus Running Today
                    </p>
                    <p className="text-sm text-gray-500">
                      Status update for today
                    </p>
                  </div>
                </div>
                <Badge variant="success">Yes</Badge>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
