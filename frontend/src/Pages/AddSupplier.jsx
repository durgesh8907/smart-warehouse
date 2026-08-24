import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function AddSupplier() {

    const navigate = useNavigate();

    const [supplier, setSupplier] = useState({
        supplier_name: "",
        company_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {

        setSupplier({
            ...supplier,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !supplier.supplier_name ||
            !supplier.company_name ||
            !supplier.email ||
            !supplier.phone
        ) {
            alert("Please fill all required fields");
            return;
        }

        try {

            await axios.post(
                "https://smart-warehouse-production-c6c8.up.railway.app/api/suppliers",
                supplier
            );

            alert("Supplier Added Successfully");

            navigate("/suppliers");

        }

        catch (error) {

            console.log(error);

            alert("Failed to Add Supplier");

        }

    };

    return (

        <div className="flex bg-slate-950 min-h-screen">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-5 lg:p-8 responsive-padding page-enter">

                    <h1 className="text-3xl font-bold text-white mb-8">

                        Add Supplier

                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-slate-900 rounded-xl p-8 grid grid-cols-2 gap-6"
                    >

                        <input
                            type="text"
                            name="supplier_name"
                            placeholder="Supplier Name"
                            value={supplier.supplier_name}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="company_name"
                            placeholder="Company Name"
                            value={supplier.company_name}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={supplier.email}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={supplier.phone}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={supplier.city}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={supplier.state}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={supplier.pincode}
                            onChange={handleChange}
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <textarea
                            name="address"
                            placeholder="Address"
                            value={supplier.address}
                            onChange={handleChange}
                            rows="4"
                            className="p-3 rounded bg-slate-800 text-white outline-none col-span-2"
                        />

                        <button
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg col-span-2 font-bold"
                        >
                            Add Supplier
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddSupplier;