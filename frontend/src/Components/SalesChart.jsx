import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function SalesChart() {

    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSalesData = async () => {

        try {

            const res = await axios.get(
               "https://smart-warehouse-hqwg.onrender.com/api/charts/sales"
            );

            setSalesData(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getSalesData();

        const interval = setInterval(() => {

            getSalesData();

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div
            className="
            bg-slate-900
            rounded-2xl
            p-6
            border
            border-slate-800
        "
        >

            <h2 className="text-white text-xl font-bold mb-5">

                Sales Overview

            </h2>

            {

                loading ?

                    (

                        <div className="h-64 flex justify-center items-center text-gray-400">

                            Loading...

                        </div>

                    )

                    :

                    (

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <LineChart
                                data={salesData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="category"
                                    stroke="#94a3b8"
                                />

                                <YAxis
                                    stroke="#94a3b8"
                                />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    )

            }

        </div>

    );

}

export default SalesChart;
