import { useEffect, useMemo, useState } from "react";
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

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(defaultDashboard);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const roleSummary = useMemo(
    () => [
      { label: "Admins", value: dashboard.totalAdmins },
      { label: "Farmers", value: dashboard.totalFarmers },
      { label: "Buyers", value: dashboard.totalBuyers },
      { label: "Suppliers", value: dashboard.totalSuppliers },
    ],
    [dashboard],
  );

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError("");
      try {
        const [dashboardRes, usersRes, ordersRes, productsRes, fertilizersRes] =
          await Promise.all([
            api.get("/api/admin/dashboard"),
            api.get("/api/admin/users"),
            api.get("/api/admin/orders"),
            api.get("/api/admin/products"),
            api.get("/api/admin/fertilizers"),
          ]);
        setDashboard(dashboardRes.data);
        setUsers(usersRes.data);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
        setFertilizers(fertilizersRes.data);
      } catch (fetchError) {
        console.error(fetchError);
        setError(
          "We couldn't load the admin control room. Please confirm your admin access and try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="rounded-3xl bg-gradient-to-r from-green-900 via-green-700 to-green-600 p-8 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-green-100">
            Lovable Admin Suite
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            Keep AgriLinker thriving
          </h1>
          <p className="mt-2 max-w-2xl text-green-100">
            Track marketplace health, nurture users, and celebrate every harvest
            with a warm, centralized admin workspace.
          </p>
        </header>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Users", value: dashboard.totalUsers },
            { label: "Orders", value: dashboard.totalOrders },
            { label: "Products", value: dashboard.totalProducts },
            { label: "Fertilizers", value: dashboard.totalFertilizers },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {loading ? "—" : stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Community roles overview
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            {roleSummary.map((role) => (
              <div
                key={role.label}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <p className="text-sm text-gray-500">{role.label}</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {loading ? "—" : role.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Latest users</h2>
            <div className="mt-4 space-y-4">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {(user.roles || []).join(", ")}
                  </div>
                </div>
              ))}
              {!loading && users.length === 0 ? (
                <p className="text-sm text-gray-500">No users yet.</p>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent orders
            </h2>
            <div className="mt-4 space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.customerEmail}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>LKR {order.totalAmount?.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">
                      {order.itemCount} items
                    </p>
                  </div>
                </div>
              ))}
              {!loading && orders.length === 0 ? (
                <p className="text-sm text-gray-500">No orders yet.</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Inventory</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Products</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {products.slice(0, 4).map((product) => (
                  <li key={product.id} className="flex justify-between">
                    <span>{product.name}</span>
                    <span className="text-gray-500">{product.quantity}</span>
                  </li>
                ))}
                {!loading && products.length === 0 ? (
                  <li className="text-gray-500">No products yet.</li>
                ) : null}
              </ul>
            </div>

            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Fertilizers</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {fertilizers.slice(0, 4).map((fertilizer) => (
                  <li key={fertilizer.id} className="flex justify-between">
                    <span>{fertilizer.name}</span>
                    <span className="text-gray-500">
                      {fertilizer.stock ?? 0}
                    </span>
                  </li>
                ))}
                {!loading && fertilizers.length === 0 ? (
                  <li className="text-gray-500">No fertilizers yet.</li>
                ) : null}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
