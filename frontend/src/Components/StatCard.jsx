import React from "react";

function StatCard({ title, value, icon, color }) {
  return (
    <div className="premium-card stat-glow rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <h2 className="text-3xl font-extrabold text-white mt-2">{value}</h2>
          <p className="text-xs text-slate-500 mt-2">Updated from warehouse data</p>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white" style={{ background: `${color}22`, color }}>
          {icon}
        </div>
      </div>
    </div>
  );
}
export default StatCard;
