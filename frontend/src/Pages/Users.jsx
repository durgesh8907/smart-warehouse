import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // GET USERS
    const getUsers = async () => {
        try {
            const res = await axios.get(
                "https://smart-warehouse-hqwg.onrender.com/api/users"
            );

            console.log("Users Data:", res.data);

            setUsers(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log("User Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-950">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1">

                {/* Navbar */}
                <Navbar />

                <div className="p-5 lg:p-8 responsive-padding page-enter">

                    {/* Header */}
                    <h1 className="
                        text-3xl
                        font-bold
                        text-white
                        mb-6
                    ">
                        Users Management
                    </h1>

                    {/* Users Table */}
                    <div className="
                        bg-slate-900
                        rounded-xl
                        overflow-hidden
                        border
                        border-slate-800
                    ">

                        <table className="w-full text-left text-gray-300">

                            <thead className="bg-slate-800">

                                <tr>

                                    <th className="p-4">
                                        ID
                                    </th>

                                    <th className="p-4">
                                        Name
                                    </th>

                                    <th className="p-4">
                                        Email
                                    </th>

                                    <th className="p-4">
                                        Phone
                                    </th>

                                    <th className="p-4">
                                        Role
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="p-5 text-center text-slate-400"
                                        >
                                            Loading users...
                                        </td>

                                    </tr>

                                ) : users.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="p-5 text-center text-slate-400"
                                        >
                                            No users found.
                                        </td>

                                    </tr>

                                ) : (

                                    users.map((user) => (

                                        <tr
                                            key={user.user_id}
                                            className="
                                                border-t
                                                border-slate-800
                                                hover:bg-slate-800/50
                                            "
                                        >

                                            <td className="p-4">
                                                {user.user_id}
                                            </td>

                                            <td className="p-4">
                                                {user.full_name}
                                            </td>

                                            <td className="p-4">
                                                {user.email}
                                            </td>

                                            <td className="p-4">
                                                {user.phone}
                                            </td>

                                            <td className="p-4">
                                                <span className="
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    bg-cyan-500/10
                                                    text-cyan-300
                                                    text-sm
                                                ">
                                                    {user.role}
                                                </span>
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Users;
