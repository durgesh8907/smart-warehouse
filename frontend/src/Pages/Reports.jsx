import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function Reports() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // GET REPORT DATA
    const getReports = async () => {
        try {
            const response = await axios.get(
                "https://smart-warehouse-hqwg.onrender.com/api/reports/products"
            );

            console.log("Report Data:", response.data);

            setProducts(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {
            console.log("Report Error:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReports();
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-950">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1">

                {/* Navbar */}
                <Navbar />

                <div className="p-5 lg:p-8 responsive-padding page-enter">

                    {/* Header */}
                    <h1 className="
                        text-3xl
                        font-bold
                        text-white
                        mb-6
                    ">
                        Reports
                    </h1>

                    {/* Reports Table */}
                    <div className="
                        bg-slate-900
                        rounded-xl
                        border
                        border-slate-800
                        overflow-hidden
                    ">

                        <div className="overflow-x-auto">

                            <table className="
                                w-full
                                min-w-[700px]
                                text-gray-300
                            ">

                                <thead className="bg-slate-800">

                                    <tr>

                                        <th className="p-4 text-left">
                                            Product
                                        </th>

                                        <th className="p-4 text-left">
                                            Category
                                        </th>

                                        <th className="p-4 text-left">
                                            Price
                                        </th>

                                        <th className="p-4 text-left">
                                            Stock
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {loading ? (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="
                                                    p-8
                                                    text-center
                                                    text-slate-400
                                                "
                                            >
                                                Loading reports...
                                            </td>

                                        </tr>

                                    ) : products.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="
                                                    p-8
                                                    text-center
                                                    text-slate-400
                                                "
                                            >
                                                No report data found.
                                            </td>

                                        </tr>

                                    ) : (

                                        products.map((item, index) => (

                                            <tr
                                                key={item.id || index}
                                                className="
                                                    border-t
                                                    border-slate-800
                                                    hover:bg-slate-800/50
                                                "
                                            >

                                                <td className="p-4">
                                                    {item.product_name || "—"}
                                                </td>

                                                <td className="p-4">
                                                    {item.category || "—"}
                                                </td>

                                                <td className="p-4">
                                                    ₹ {item.price ?? 0}
                                                </td>

                                                <td className="p-4">
                                                    {item.stock ?? 0}
                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Reports;
