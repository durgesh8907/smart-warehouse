import React, {useState} from "react";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";


function Settings(){


const [user]=useState(

JSON.parse(
localStorage.getItem("user")
)

||
{}

);



const [password,setPassword]=useState("");



return(


<div className="flex min-h-screen bg-slate-950">


    <Sidebar />


    <div className="flex-1">


        <Navbar />


        <div className="p-5 lg:p-8 responsive-padding page-enter">



            <h1 className="
            text-3xl
            font-bold
            text-white
            mb-8
            ">

                Settings

            </h1>




            {/* PROFILE */}

            <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-xl
            p-6
            mb-6
            ">


                <h2 className="
                text-xl
                font-bold
                text-white
                mb-5
                ">

                    Profile Information

                </h2>



                <div className="grid md:grid-cols-2 gap-5">



                    <div>

                        <label className="text-gray-400">
                            Name
                        </label>

                        <input

                        value={user.full_name || ""}

                        readOnly

                        className="
                        w-full
                        mt-2
                        p-3
                        rounded-lg
                        bg-slate-800
                        text-white
                        "

                        />

                    </div>





                    <div>

                        <label className="text-gray-400">
                            Email
                        </label>

                        <input

                        value={user.email || ""}

                        readOnly

                        className="
                        w-full
                        mt-2
                        p-3
                        rounded-lg
                        bg-slate-800
                        text-white
                        "

                        />

                    </div>



                    <div>

                        <label className="text-gray-400">
                            Role
                        </label>

                        <input

                        value={user.role || ""}

                        readOnly

                        className="
                        w-full
                        mt-2
                        p-3
                        rounded-lg
                        bg-slate-800
                        text-white
                        "

                        />

                    </div>



                </div>


            </div>






            {/* PASSWORD */}


            <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-xl
            p-6
            ">


                <h2 className="
                text-xl
                font-bold
                text-white
                mb-5
                ">

                    Change Password

                </h2>



                <input

                type="password"

                placeholder="Enter New Password"

                value={password}

                onChange={
                    (e)=>setPassword(e.target.value)
                }


                className="
                w-full
                md:w-1/2
                p-3
                rounded-lg
                bg-slate-800
                text-white
                "

                />



                <button

                className="
                block
                mt-5
                bg-cyan-600
                hover:bg-cyan-700
                text-white
                px-6
                py-3
                rounded-lg
                "

                >

                    Update Password

                </button>



            </div>





        </div>


    </div>


</div>


);


}


export default Settings;