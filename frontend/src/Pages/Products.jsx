import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaFilter, FaBoxOpen } from "react-icons/fa";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockStatus, setStockStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const getProducts = async () => {
    try {
      const res = await axios.get("https://smart-warehouse-production-c6c8.up.railway.app/api/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load products");
    } finally { setLoading(false); }
  };

  useEffect(() => { getProducts(); }, []);

  const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category).filter(Boolean))], [products]);

  const filteredProducts = products.filter(item => {
    const q = search.toLowerCase();
    const matchesSearch = String(item.product_name || "").toLowerCase().includes(q) || String(item.category || "").toLowerCase().includes(q);
    const matchesCategory = category === "All" || item.category === category;
    const stock = Number(item.stock || 0);
    const matchesStock = stockStatus === "All" || (stockStatus === "Low" && stock > 0 && stock < 10) || (stockStatus === "Out" && stock === 0) || (stockStatus === "In" && stock >= 10);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`https://smart-warehouse-production-c6c8.up.railway.app/api/products/${deleteId}`);
      toast.success("Product deleted successfully");
      setDeleteId(null);
      getProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 page-main">
        <Navbar />
        <main className="p-5 lg:p-8 responsive-padding page-enter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
            <div>
              <div className="flex items-center gap-3"><span className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center"><FaBoxOpen /></span><h1 className="text-2xl lg:text-3xl font-extrabold text-white">Products Management</h1></div>
              <p className="text-slate-400 mt-2">Search, filter and manage warehouse products.</p>
            </div>
            <button onClick={() => navigate("/add-product")} className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-cyan-500/10"><FaPlus /> Add Product</button>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_180px_auto] gap-3">
              <div className="flex items-center bg-slate-800 border border-slate-700 px-4 rounded-xl"><FaSearch className="text-cyan-400 mr-3" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search product or category..." className="w-full bg-transparent text-white py-3" /></div>
              <select value={category} onChange={e => setCategory(e.target.value)} className="bg-slate-800 text-white border border-slate-700 rounded-xl px-3"><option value="All">All Categories</option>{categories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}</select>
              <select value={stockStatus} onChange={e => setStockStatus(e.target.value)} className="bg-slate-800 text-white border border-slate-700 rounded-xl px-3"><option value="All">All Stock</option><option value="In">In Stock</option><option value="Low">Low Stock</option><option value="Out">Out of Stock</option></select>
              <button onClick={() => { setSearch(""); setCategory("All"); setStockStatus("All"); }} className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-2"><FaFilter /> Reset</button>
            </div>
            <p className="text-xs text-slate-500 mt-3">Showing {filteredProducts.length} of {products.length} products</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden table-scroll">
            {loading ? <div className="p-12 text-center text-slate-400">Loading products...</div> : filteredProducts.length === 0 ? <div className="empty-state"><FaBoxOpen className="mx-auto text-3xl mb-3" /><p>No products match your filters.</p></div> : (
              <table className="w-full min-w-[850px]">
                <thead className="bg-slate-800/80 text-slate-300"><tr>{["ID","Product","Category","Price","Stock","Description","Action"].map(h => <th key={h} className="p-4">{h}</th>)}</tr></thead>
                <tbody className="text-white">
                  {filteredProducts.map(item => {
                    const stock = Number(item.stock || 0);
                    return <tr key={item.id} className="border-b border-slate-800 text-center">
                      <td className="p-4 text-slate-500">#{item.id}</td>
                      <td className="p-4 font-semibold">{item.product_name}</td>
                      <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs">{item.category}</span></td>
                      <td className="p-4">₹ {item.price}</td>
                      <td className="p-4">{stock === 0 ? <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-300 text-xs">Out</span> : stock < 10 ? <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs">{stock} Low</span> : <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs">{stock}</span>}</td>
                      <td className="p-4 text-slate-400 max-w-xs truncate">{item.description || "—"}</td>
                      <td className="p-4"><button onClick={() => navigate(`/edit-product/${item.id}`)} className="bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-white p-2.5 rounded-lg mr-2"><FaEdit /></button><button onClick={() => setDeleteId(item.id)} className="bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500 hover:text-white p-2.5 rounded-lg"><FaTrash /></button></td>
                    </tr>;
                  })}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {deleteId && <div className="modal-backdrop"><div className="modal-card"><h2 className="text-xl font-bold text-white">Delete product?</h2><p className="text-slate-400 mt-2">This action will permanently remove the selected product.</p><div className="flex justify-end gap-3 mt-6"><button onClick={() => setDeleteId(null)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300">Cancel</button><button onClick={confirmDelete} className="px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold">Delete</button></div></div></div>}
    </div>
  );
}
export default Products;
