import { useEffect, useMemo, useState } from "react";
import {
  Users,
  ShoppingCart,
  Package,
  Leaf,
  Shield,
  Tractor,
  User,
  Store,
  LayoutDashboard,
  BarChart3,
  MessageSquareWarning,
  Settings,
} from "lucide-react";
import api from "../../api/api";

const defaultDashboard = {
  totalUsers: 0,
  totalFarmers: 0,
  totalBuyers: 0,
  totalSuppliers: 0,
  totalAdmins: 0,
  totalProducts: 0,
  totalOrders: 0,
  totalFertilizers: 0,
};

function StatCard({ label, value, loading, Icon, accent = "bg-green-600" }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-white ${accent}`}
        >
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-gray-900">
        {loading ? "—" : value}
      </p>
    </div>
  );
}

function RoleCard({ label, value, loading, Icon, accent = "bg-gray-900" }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-white ${accent}`}
        >
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-gray-900">
        {loading ? "—" : value}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(defaultDashboard);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useSta
