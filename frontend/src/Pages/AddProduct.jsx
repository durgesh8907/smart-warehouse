import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";


function AddProduct() {


    const navigate = useNavigate();


    const [product, setProduct] = useState({

        product_name: "",
        category: "",
        price: "",
        stock: "",
        description: ""

    });



    const [loading, setLoading] = useState(false);



    // Handle Input Change

    const handleChange = (e) => {

        setProduct({

            ...product,

            [e.target.name]: e.target.value

        });

    };





    // Add Product API

    const handleSubmit = async (e) => {

        e.preventDefault();



        // Validation

        if(

            !product.product_name ||
            !product.category ||
            !product.price ||
            !product.stock

        ){

            toast.error("Please fill all required fields");

            return;

        }



        try {


            setLoading(true);



            const res = await axios.post(

                "http://localhost:5000/api/products",

                product

            );



            toast.success(res.data.message || "Product added successfully");



            // Clear Form

            setProduct({

                product_name:"",
                category:"",
                price:"",
                stock:"",
                description:""

            });



            navigate("/products");


        }


        catch(error){


            console.log(error);



            toast.error(error.response?.data?.message || "Product added failed");


        }


        finally{


            setLoading(false);


        }


    };





    return (

        <div className="flex bg-slate-950 min-h-screen">


            <Sidebar />



            <div className="flex-1">


                <Navbar />



                <div className="p-5 lg:p-8 responsive-padding page-enter">


                    <h1 className="text-3xl font-bold text-white mb-8">

                        Add New Product

                    </h1>




                    <form

                        onSubmit={handleSubmit}

                        className="bg-slate-900 p-8 rounded-2xl"

                    >



                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



                            {/* Product Name */}

                            <div>

                                <label className="text-white">

                                    Product Name

                                </label>


                                <input

                                    type="text"

                                    name="product_name"

                                    value={product.product_name}

                                    onChange={handleChange}

                                    placeholder="Enter product name"

                                    className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white outline-none"

                                />


                            </div>





                            {/* Category */}

                            <div>

                                <label className="text-white">

                                    Category

                                </label>


                                <select

                                    name="category"

                                    value={product.category}

                                    onChange={handleChange}

                                    className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white"

                                >

                                    <option value="">

                                        Select Category

                                    </option>


                                    <option value="Laptop">

                                        Laptop

                                    </option>


                                    <option value="Mobile">

                                        Mobile

                                    </option>


                                    <option value="Tablet">

                                        Tablet

                                    </option>


                                </select>


                            </div>






                            {/* Price */}

                            <div>

                                <label className="text-white">

                                    Price

                                </label>


                                <input

                                    type="number"

                                    name="price"

                                    value={product.price}

                                    onChange={handleChange}

                                    placeholder="Enter price"

                                    className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white outline-none"

                                />


                            </div>






                            {/* Stock */}

                            <div>


                                <label className="text-white">

                                    Stock Quantity

                                </label>



                                <input

                                    type="number"

                                    name="stock"

                                    value={product.stock}

                                    onChange={handleChange}

                                    placeholder="Enter stock"

                                    className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white outline-none"

                                />


                            </div>



                        </div>






                        {/* Description */}


                        <div className="mt-6">


                            <label className="text-white">

                                Description

                            </label>



                            <textarea

                                name="description"

                                value={product.description}

                                onChange={handleChange}

                                placeholder="Enter product description"

                                rows="5"

                                className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white outline-none"

                            />


                        </div>







                        <button


                            type="submit"


                            disabled={loading}


                            className="mt-8 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 px-8 py-3 rounded-lg text-white font-bold"


                        >

                            {

                                loading ?

                                "Adding Product..." :

                                "Save Product"

                            }


                        </button>





                    </form>


                </div>


            </div>


        </div>

    );

}


export default AddProduct;