import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import StatCard from "../Components/StatCard";
import InventoryChart from "../Components/InventoryChart";
import SalesChart from "../Components/SalesChart";
import { FaBoxes, FaWarehouse, FaExclamationTriangle, FaClipboardList, FaArrowRight, FaChartLine, FaPlus } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalProducts: 0, totalStock: 0, lowStock: 0, totalCategories: 0 });
  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      const res = await axios.get("https://smart-warehouse-hqwg.onrender.com/api/dashboard");
      setStats(res.data || {});
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    getDashboardData();
    const interval = setInterval(getDashboardData, 15000);
    return () => clearInterval(interval);
  }, []);

  const activities = [
    ["Product inventory checked", "Recently", "bg-cyan-400"],
    ["Dashboard data refreshed", "Recently", "bg-cyan-400"],
    ["Low-stock status reviewed", "Recently", "bg-amber-400"],
    ["Warehouse report opened", "Recently", "bg-emerald-400"],
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 page-main">
        <Navbar />
        <main className="p-5 lg:p-8 responsive-padding page-enter">
          <section className="warehouse-banner mb-7">
            <div className="banner-content">
              <span className="banner-eyebrow">
                <FaChartLine /> Warehouse Intelligence
              </span>

              <h1 className="banner-title">
                Smarter inventory.<br />
                Better warehouse control.
              </h1>

              <p className="banner-text">
                Monitor products, stock levels and warehouse operations from one
                professional dashboard designed for faster daily decisions.
              </p>

              <div className="banner-actions">
                <button
                  onClick={() => navigate("/add-product")}
                  className="banner-primary"
                >
                  <FaPlus /> Add Product
                </button>

                <button
                  onClick={() => navigate("/reports")}
                  className="banner-secondary"
                >
                  View Reports <FaArrowRight />
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard title="Total Products" value={loading ? "..." : stats.totalProducts} icon={<FaBoxes />} color="#06B6D4" />
            <StatCard title="Total Stock" value={loading ? "..." : stats.totalStock} icon={<FaWarehouse />} color="#22C55E" />
            <StatCard title="Low Stock" value={loading ? "..." : stats.lowStock} icon={<FaExclamationTriangle />} color="#EF4444" />
            <StatCard title="Categories" value={loading ? "..." : stats.totalCategories} icon={<FaClipboardList />} color="#F59E0B" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
            <InventoryChart />
            <SalesChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
            <div className="lg:col-span-2 premium-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5"><div><h2 className="text-lg font-bold text-white">Recent Activity</h2><p className="text-xs text-slate-500 mt-1">Latest workspace activity</p></div><span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300">Live</span></div>
              <div className="space-y-3">{activities.map(([name,time,color]) => <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60"><span className={`w-2.5 h-2.5 rounded-full ${color}`}></span><div className="flex-1"><p className="text-sm text-slate-200">{name}</p><p className="text-xs text-slate-500 mt-0.5">{time}</p></div></div>)}</div>
            </div>
            <div className="premium-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white">Quick Actions</h2><p className="text-xs text-slate-500 mt-1 mb-4">Common warehouse tasks</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => navigate("/add-product")} className="p-4 rounded-xl bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500 hover:text-white text-sm font-semibold">Add Product</button>
                <button onClick={() => navigate("/products")} className="p-4 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-sm font-semibold">Products</button>
                <button onClick={() => navigate("/suppliers")} className="p-4 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-sm font-semibold">Suppliers</button>
                <button onClick={() => navigate("/reports")} className="p-4 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-sm font-semibold">Reports</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
