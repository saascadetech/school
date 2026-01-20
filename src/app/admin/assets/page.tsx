"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, assets } from "@/lib/data";
import {
  Settings,
  Plus,
  Search,
  Filter,
  DollarSign,
  MapPin,
  Calendar,
  MoreVertical,
  Edit,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AssetsManagement() {
  const [role, setRole] = useState<Role>("principal");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterCategory === "all" || asset.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const totalAssets = assets.length;
  const totalValue = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const inUseAssets = assets.filter((a) => a.status === "in_use").length;
  const maintenanceAssets = assets.filter(
    (a) => a.status === "under_maintenance",
  ).length;

  const categoryLabels: Record<string, string> = {
    furniture: "Furniture",
    electronics: "Electronics",
    sports: "Sports",
    lab_equipment: "Lab Equipment",
    vehicles: "Vehicles",
    books: "Books",
    stationery: "Stationery",
    other: "Other",
  };

  const conditionLabels: Record<string, { label: string; class: string }> = {
    excellent: { label: "Excellent", class: "bg-green-100 text-green-700" },
    good: { label: "Good", class: "bg-blue-100 text-blue-700" },
    fair: { label: "Fair", class: "bg-amber-100 text-amber-700" },
    poor: { label: "Poor", class: "bg-red-100 text-red-700" },
    scrapped: { label: "Scrapped", class: "bg-gray-100 text-gray-700" },
  };

  const statusLabels: Record<string, { label: string; class: string }> = {
    in_use: { label: "In Use", class: "bg-green-100 text-green-700" },
    under_maintenance: {
      label: "Maintenance",
      class: "bg-amber-100 text-amber-700",
    },
    disposed: { label: "Disposed", class: "bg-red-100 text-red-700" },
    lost: { label: "Lost", class: "bg-gray-100 text-gray-700" },
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Assets Management
            </h1>
            <p className="text-gray-500 mt-1">
              Track and manage school assets and inventory
            </p>
          </div>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Asset
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalAssets}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{(totalValue / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Use</p>
                <p className="text-2xl font-bold text-green-600">
                  {inUseAssets}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Maintenance</p>
                <p className="text-2xl font-bold text-amber-600">
                  {maintenanceAssets}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or asset code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="sports">Sports</option>
                <option value="lab_equipment">Lab Equipment</option>
                <option value="vehicles">Vehicles</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">{asset.assetCode}</p>
                    <h3 className="font-semibold text-gray-900">
                      {asset.name}
                    </h3>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span>{categoryLabels[asset.category]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{asset.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>
                      Purchased:{" "}
                      {new Date(asset.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span>
                      Value: ₹{asset.currentValue.toLocaleString()} (
                      {asset.depreciation}% dep.)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      conditionLabels[asset.condition].class,
                    )}
                  >
                    {conditionLabels[asset.condition].label}
                  </span>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      statusLabels[asset.status].class,
                    )}
                  >
                    {statusLabels[asset.status].label}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
