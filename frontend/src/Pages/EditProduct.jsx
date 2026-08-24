import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";


function EditProduct() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [product, setProduct] = useState({

        product_name:"",
        category:"",
        price:"",
        stock:"",
        description:""

    });



    // Get Product Data

    const getProduct = async()=>{


        try{


            const res = await axios.get(

                `https://smart-warehouse-production-c6c8.up.railway.app/api/products/${id}`

            );


            setProduct(res.data);


        }

        catch(error){

            console.log(error);

        }


    };



    useEffect(()=>{


        getProduct();


        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);





    const handleChange=(e)=>{


        setProduct({

            ...product,

            [e.target.name]:e.target.value

        });


    };






    // Update Product

    const handleUpdate=async(e)=>{


        e.preventDefault();


        try{


            await axios.put(

                `https://smart-warehouse-production-c6c8.up.railway.app/api/products/${id}`,

                product

            );


            toast.success("Product updated successfully");


            navigate("/products");


        }

        catch(error){


            console.log(error);


            toast.error(error.response?.data?.message || "Update failed");


        }


    };




    return (

        <div className="flex bg-slate-950 min-h-screen">


            <Sidebar />


            <div className="flex-1">


                <Navbar />


                <div className="p-5 lg:p-8 responsive-padding page-enter">


                    <h1 className="text-3xl text-white font-bold mb-8">

                        Edit Product

                    </h1>




                    <form

                    onSubmit={handleUpdate}

                    className="bg-slate-900 p-8 rounded-2xl"


                    >



                    <input

                    name="product_name"

                    value={product.product_name}

                    onChange={handleChange}

                    placeholder="Product Name"

                    className="w-full mb-4 p-3 bg-slate-800 text-white rounded"

                    />





                    <select

                    name="category"

                    value={product.category}

                    onChange={handleChange}

                    className="w-full mb-4 p-3 bg-slate-800 text-white rounded"

                    >

                        <option>
                            Laptop
                        </option>

                        <option>
                            Mobile
                        </option>

                        <option>
                            Tablet
                        </option>


                    </select>





                    <input

                    type="number"

                    name="price"

                    value={product.price}

                    onChange={handleChange}

                    placeholder="Price"

                    className="w-full mb-4 p-3 bg-slate-800 text-white rounded"

                    />







                    <input

                    type="number"

                    name="stock"

                    value={product.stock}

                    onChange={handleChange}

                    placeholder="Stock"

                    className="w-full mb-4 p-3 bg-slate-800 text-white rounded"

                    />







                    <textarea

                    name="description"

                    value={product.description}

                    onChange={handleChange}

                    placeholder="Description"

                    className="w-full mb-4 p-3 bg-slate-800 text-white rounded"

                    />






                    <button

                    type="submit"

                    className="bg-cyan-500 px-8 py-3 rounded text-white font-bold"

                    >

                        Update Product

                    </button>



                    </form>


                </div>


            </div>


        </div>


    );

}


export default EditProduct;