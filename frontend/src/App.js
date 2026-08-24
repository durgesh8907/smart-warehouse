import React from "react";

import {
    Routes,
    Route
} from "react-router-dom";


// Pages

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import Dashboard from "./Pages/Dashboard";

import Products from "./Pages/Products";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";

import Users from "./Pages/Users";
import Inventory from "./Pages/Inventory";
import Suppliers from "./Pages/Suppliers";
import Reports from "./Pages/Reports";
import Settings from "./Pages/Settings";


function App(){


    return(

        <Routes>


            {/* LOGIN */}

            <Route
                path="/"
                element={<Login />}
            />



            {/* REGISTER */}

            <Route
                path="/register"
                element={<Register />}
            />



            {/* DASHBOARD */}

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />



            {/* PRODUCTS */}

            <Route
                path="/products"
                element={<Products />}
            />


            <Route
                path="/add-product"
                element={<AddProduct />}
            />


            <Route
                path="/edit-product/:id"
                element={<EditProduct />}
            />



            {/* USERS */}

            <Route
                path="/users"
                element={<Users />}
            />



            {/* INVENTORY */}

            <Route
                path="/inventory"
                element={<Inventory />}
            />



            {/* SUPPLIERS */}

            <Route
                path="/suppliers"
                element={<Suppliers />}
            />



            {/* REPORTS */}

            <Route
                path="/reports"
                element={<Reports />}
            />

            {/* SETTINGS */}
            

             <Route

                path="/settings"

                 element={<Settings />}

                />


            {/* 404 */}

            <Route

                path="*"

                element={

                    <div className="
                    min-h-screen
                    bg-slate-950
                    flex
                    justify-center
                    items-center
                    ">

                        <h1 className="
                        text-white
                        text-3xl
                        font-bold
                        ">

                            404 - Page Not Found

                        </h1>


                    </div>

                }

            />


        </Routes>

    );

}


export default App;