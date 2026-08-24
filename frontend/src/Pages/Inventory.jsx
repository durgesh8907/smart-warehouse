import React from "react";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import InventoryChart from "../Components/InventoryChart";

function Inventory() {

    return (

        <div className="flex bg-slate-950 min-h-screen">

            {/* Sidebar */}

            <Sidebar />

            {/* Main Content */}

            <div className="flex-1">

                <Navbar />

                <div className="p-5 lg:p-8 responsive-padding page-enter">

                    {/* Header */}

                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-white">

                            Inventory Dashboard

                        </h1>

                        <p className="text-gray-400 mt-2">

                            Monitor inventory stock by category in real time.

                        </p>

                    </div>

                    {/* Inventory Chart */}

                    <InventoryChart />

                </div>

            </div>

        </div>

    );

}

export default Inventory;