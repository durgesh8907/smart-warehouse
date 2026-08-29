import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function InventoryChart() {

    const [inventoryData, setInventoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchInventory = async () => {

            try {

                const res = await axios.get(
                   "https://smart-warehouse-hqwg.onrender.com/api/charts/inventory"
                );

                setInventoryData(res.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchInventory();

    }, []);

    if (loading) {

        return (

            <div className="bg-slate-900 rounded-xl p-6 text-white">

                Loading Inventory...

            </div>

        );

    }

    return (

        <div className="bg-slate-900 rounded-xl p-6">

            <h2 className="text-white text-2xl font-bold mb-6">

                Inventory Overview

            </h2>

            <ResponsiveContainer width="100%" height={350}>

                <BarChart data={inventoryData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="category"
                        stroke="#94a3b8"
                    />

                    <YAxis stroke="#94a3b8" />

                    <Tooltip />

                    <Bar
                        dataKey="stock"
                        fill="#06B6D4"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default InventoryChart;
