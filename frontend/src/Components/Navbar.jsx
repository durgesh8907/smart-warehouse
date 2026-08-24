import React, { useState } from "react";
import { FaBell, FaSearch, FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="min-h-20 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-40">
      <div className="pl-12 lg:pl-0">
        <h1 className="text-xl lg:text-2xl font-bold text-white">Smart Warehouse</h1>
        <p className="text-slate-400 text-xs lg:text-sm mt-0.5">{today}</p>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <div className="desktop-search hidden md:flex items-center bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl">
          <FaSearch className="text-slate-500" />
          <input type="text" placeholder="Search..." className="bg-transparent text-white ml-3 w-40 lg:w-56 placeholder:text-slate-500" />
        </div>

        <div className="relative">
          <button onClick={() => setShowNotifications(v => !v)} className="relative w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 flex items-center justify-center">
            <FaBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center">3</span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4">
              <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-white">Notifications</h3><span className="text-xs text-cyan-400">3 new</span></div>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/10"><p className="text-sm text-white">Low-stock products need attention.</p><p className="text-xs text-slate-500 mt-1">Inventory alert</p></div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/10"><p className="text-sm text-white">Review your latest product updates.</p><p className="text-xs text-slate-500 mt-1">Product management</p></div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/10"><p className="text-sm text-white">System is ready for daily operations.</p><p className="text-xs text-slate-500 mt-1">System status</p></div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setShowProfile(v => !v)} className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800">
            <FaUserCircle className="text-3xl text-cyan-400" />
            <div className="hidden sm:block text-left">
              <p className="text-white font-semibold text-sm">{user?.full_name || "Admin"}</p>
              <p className="text-slate-500 text-xs">{user?.role || "Administrator"}</p>
            </div>
            <FaChevronDown className="hidden sm:block text-slate-500 text-xs" />
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2">
              <button onClick={() => navigate("/settings")} className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800">Profile & Settings</button>
              <button onClick={logout} className="w-full text-left px-3 py-2 rounded-lg text-red-300 hover:bg-red-500/10 flex items-center gap-2"><FaSignOutAlt /> Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Navbar;
