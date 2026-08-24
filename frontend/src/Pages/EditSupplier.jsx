import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function EditSupplier() {

    const { id } = useParams();

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

    // Load Supplier
    useEffect(() => {

        axios.get(`http://localhost:5000/api/suppliers/${id}`)
        .then((res) => {

            setSupplier(res.data);

        })
        .catch((err) => {

            console.log(err);

        });

    }, [id]);

    // Handle Change
    const handleChange = (e) => {

        setSupplier({

            ...supplier,

            [e.target.name]: e.target.value

        });

    };

    // Update Supplier
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(

                `http://localhost:5000/api/suppliers/${id}`,

                supplier

            );

            alert("Supplier Updated Successfully");

            navigate("/suppliers");

        }

        catch(error){

            console.log(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="flex bg-slate-950 min-h-screen">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-5 lg:p-8 responsive-padding page-enter">

                    <h1 className="text-3xl font-bold text-white mb-8">

                        Edit Supplier

                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-slate-900 rounded-xl p-8 grid grid-cols-2 gap-6"
                    >

                        <input
                            type="text"
                            name="supplier_name"
                            value={supplier.supplier_name}
                            onChange={handleChange}
                            placeholder="Supplier Name"
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="company_name"
                            value={supplier.company_name}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="email"
                            name="email"
                            value={supplier.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="phone"
                            value={supplier.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="city"
                            value={supplier.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="state"
                            value={supplier.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <input
                            type="text"
                            name="pincode"
                            value={supplier.pincode}
                            onChange={handleChange}
                            placeholder="Pincode"
                            className="p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <textarea
                            rows="4"
                            name="address"
                            value={supplier.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="col-span-2 p-3 rounded bg-slate-800 text-white outline-none"
                        />

                        <button
                            type="submit"
                            className="col-span-2 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-bold"
                        >
                            Update Supplier
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditSupplier;