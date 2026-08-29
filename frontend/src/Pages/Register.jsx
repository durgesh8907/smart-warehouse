import React, { useState } from "react";
import {
  FaWarehouse,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        role: "Employee"
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle Input Change
    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    // Register Function
    const handleRegister = async () => {

        setMessage("");

        // Required Fields
        if (
            !user.full_name ||
            !user.email ||
            !user.phone ||
            !user.password
        ) {
            setMessage("Please fill all required fields");
            return;
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(user.email)) {
            setMessage("Please enter a valid email address");
            return;
        }

        // Phone Validation
        if (!/^\d{10}$/.test(user.phone)) {
            setMessage("Phone number must be exactly 10 digits");
            return;
        }

        // Password Validation
        if (user.password.length < 6) {
            setMessage("Password must be at least 6 characters");
            return;
        }

        try {

            setLoading(true);

            const res = await axios.post(
                     "https://smart-warehouse-hqwg.onrender.com/api/auth/register",
                user
            );

            setLoading(false);

            setMessage(res.data.message);

            // Clear Form
            setUser({
                full_name: "",
                email: "",
                phone: "",
                password: "",
                role: "Employee"
            });

            // Redirect to Login
            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {

            setLoading(false);

            setMessage(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

            <motion.div

                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}

                className="w-[430px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"

            >

                <div className="text-center">

                    <FaWarehouse
                        className="mx-auto text-cyan-400 text-6xl"
                    />

                    <h1 className="text-3xl font-bold text-white mt-4">
                        Create Account
                    </h1>

                    <p className="text-gray-300 mt-2">
                        Smart Warehouse Management System
                    </p>

                </div>

                {message && (

                    <p className="text-center text-cyan-400 mt-5">
                        {message}
                    </p>

                )}

                {/* Full Name */}

                <InputBox
                    icon={<FaUser />}
                    name="full_name"
                    placeholder="Full Name"
                    value={user.full_name}
                    change={handleChange}
                />

                {/* Email */}

                <InputBox
                    icon={<FaEnvelope />}
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={user.email}
                    change={handleChange}
                />

                {/* Phone */}

                <InputBox
                    icon={<FaPhone />}
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={user.phone}
                    change={handleChange}
                />

                {/* Password */}

                <InputBox
                    icon={<FaLock />}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    change={handleChange}
                />

                {/* Role */}

                <select
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    className="w-full mt-4 p-3 rounded-lg bg-black/40 text-white outline-none"
                >

                    <option className="text-black">
                        Employee
                    </option>

                    <option className="text-black">
                        Manager
                    </option>

                    <option className="text-black">
                        Admin
                    </option>

                </select>

                {/* Register Button */}

                <button

                    disabled={loading}

                    onClick={handleRegister}

                    className="
                    w-full
                    mt-6
                    py-3
                    rounded-lg
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    text-white
                    font-bold
                    hover:scale-105
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    "

                >

                    {loading ? "Creating Account..." : "REGISTER"}

                </button>

                {/* Login Link */}

                <p className="text-center text-gray-300 mt-6">

                    Already have an account?

                    <span

                        onClick={() => navigate("/")}

                        className="text-cyan-400 ml-2 cursor-pointer hover:underline"

                    >

                        Login

                    </span>

                </p>

            </motion.div>

        </div>

    );

}

// Reusable Input Component

function InputBox({
    icon,
    name,
    placeholder,
    type = "text",
    value,
    change
}) {

    return (

        <div className="flex items-center bg-black/40 rounded-lg mt-4 px-4">

            <span className="text-cyan-400">
                {icon}
            </span>

            <input

                type={type}

                name={name}

                value={value}

                onChange={change}

                placeholder={placeholder}

                className="
                w-full
                p-3
                bg-transparent
                outline-none
                text-white
                placeholder-gray-400
                "

            />

        </div>

    );

}

export default Register;
