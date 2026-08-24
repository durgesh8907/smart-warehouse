import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaBoxOpen, FaWarehouse, FaTruck, FaUsers,
  FaChartBar, FaCog, FaSignOutAlt, FaBars, FaTimes
} from "react-icons/fa";
import toast from "react-hot-toast";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const menuItems = [
    ["Dashboard", "/dashboard", <FaTachometerAlt />],
    ["Products", "/products", <FaBoxOpen />],
    ["Inventory", "/inventory", <FaWarehouse />],
    ["Suppliers", "/suppliers", <FaTruck />],
    ["Users", "/users", <FaUsers />],
    ["Reports", "/reports", <FaChartBar />],
    ["Settings", "/settings", <FaCog />],
  ];

  return (
    <>
      <button className="mobile-menu-button fixed left-4 top-4 z-[70]" onClick={() => setOpen(true)} aria-label="Open menu">
        <FaBars />
      </button>

      {open && <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`sidebar-shell sidebar-shell-inner w-72 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col ${open ? "mobile-open" : ""}`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.22em] text-slate-500">Management System</p>
            <h1 className="text-2xl font-extrabold text-cyan-400 mt-1">Smart Warehouse</h1>
          </div>
          <button className="text-slate-400 hover:text-white lg:hidden" onClick={() => setOpen(false)}><FaTimes /></button>
        </div>

        <div className="px-4 py-5 flex-1 space-y-1">
          {menuItems.map(([name, path, icon]) => {
            const active = location.pathname === path || (path !== "/dashboard" && location.pathname.startsWith(path));
            return (
              <Link
                key={name}
                to={path}
                onClick={() => setOpen(false)}
                className={`sidebar-link ${active ? "active" : ""} flex items-center gap-4 px-4 py-3.5 rounded-xl text-[15px] font-medium ${active ? "bg-cyan-500/15 text-cyan-300" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
              >
                <span className={`text-lg ${active ? "text-cyan-400" : "text-slate-400"}`}>{icon}</span>
                {name}
              </Link>
            );
          })}
        </div>

        <div className="p-5 border-t border-slate-800">
          <button onClick={logout} className="w-full bg-red-500/10 border border-red-500/20 hover:bg-red-500 text-red-300 hover:text-white py-3 rounded-xl flex justify-center items-center gap-3 font-semibold">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
