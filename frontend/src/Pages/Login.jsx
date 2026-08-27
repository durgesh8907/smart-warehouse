import React, { useState } from "react";
import { FaWarehouse, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {

        if (!user.email || !user.password) {
            setMessage("Please fill all fields");
            return;
        }

        try {

            const res = await axios.post(
                "https://smart-warehouse-hqwq.onrender.com/api/auth/login",
                user
            );

            // Save User Data
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            setMessage(res.data.message);

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-[400px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            >

                <div className="text-center">

                    <FaWarehouse className="mx-auto text-cyan-400 text-6xl" />

                    <h1 className="text-3xl font-bold text-white mt-4">
                        Smart Warehouse
                    </h1>

                    <p className="text-gray-300">
                        Login
                    </p>

                </div>

                {message && (
                    <p className="text-center text-red-400 mt-5">
                        {message}
                    </p>
                )}

                <div className="mt-6">

                    <label className="text-white">
                        Email
                    </label>

                    <div className="flex items-center bg-black/40 rounded-lg mt-2 px-4">

                        <FaEnvelope className="text-cyan-400" />

                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className="w-full p-3 bg-transparent outline-none text-white"
                        />

                    </div>

                </div>

                <div className="mt-4">

                    <label className="text-white">
                        Password
                    </label>

                    <div className="flex items-center bg-black/40 rounded-lg mt-2 px-4">

                        <FaLock className="text-cyan-400" />

                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            className="w-full p-3 bg-transparent outline-none text-white"
                        />

                    </div>

                </div>

                <button
                    onClick={handleLogin}
                    className="w-full mt-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:scale-105 transition"
                >
                    LOGIN
                </button>

                <p className="text-center text-gray-300 mt-6">

                    Don't have an account?

                    <span
                        onClick={() => navigate("/register")}
                        className="text-cyan-400 ml-2 cursor-pointer hover:underline"
                    >
                        Register
                    </span>

                </p>

            </motion.div>

        </div>

    );

}

export default Login;
