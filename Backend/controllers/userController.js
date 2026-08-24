const db = require("../config/db");
const bcrypt = require("bcrypt");


// ==========================
// GET ALL USERS
// ==========================

const getUsers = (req, res) => {


    const sql = `
    SELECT 
    user_id AS id,
    full_name,
    email,
    phone,
    role,
    created_at
    FROM users
    ORDER BY user_id DESC
`;


    db.query(sql, (err, result) => {


        if(err){

            return res.status(500).json({

                success:false,
                message:err.message

            });

        }


        res.json(result);


    });


};




// ==========================
// ADD USER
// ==========================

const addUser = async(req,res)=>{


    try{


        const {

            full_name,
            email,
            phone,
            password,
            role

        } = req.body;



        if(!full_name || !email || !password){


            return res.status(400).json({

                success:false,
                message:"Please fill required fields"

            });


        }




        // Check Email

        const checkSql =
        "SELECT * FROM users WHERE email=?";



        db.query(checkSql,[email],async(err,result)=>{


            if(err){

                return res.status(500).json({

                    message:err.message

                });

            }



            if(result.length > 0){


                return res.status(400).json({

                    message:"Email already exists"

                });


            }




            const hashPassword =
            await bcrypt.hash(password,10);




            const insertSql = `

            INSERT INTO users

            (full_name,email,phone,password,role)

            VALUES(?,?,?,?,?)

            `;



            db.query(

                insertSql,

                [

                    full_name,
                    email,
                    phone,
                    hashPassword,
                    role || "Employee"

                ],

                (err)=>{


                    if(err){

                        return res.status(500).json({

                            message:err.message

                        });

                    }



                    res.json({

                        success:true,
                        message:"User Added Successfully"

                    });


                }


            );



        });




    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};





// ==========================
// UPDATE USER
// ==========================

const updateUser = (req,res)=>{


    const id = req.params.id;


    const {

        full_name,
        email,
        phone,
        role

    } = req.body;




    const sql = `

    UPDATE users SET

    full_name=?,
    email=?,
    phone=?,
    role=?

   WHERE user_id=?

    `;



    db.query(

        sql,

        [

            full_name,
            email,
            phone,
            role,
            id

        ],

        (err)=>{


            if(err){

                return res.status(500).json({

                    message:err.message

                });

            }



            res.json({

                success:true,
                message:"User Updated Successfully"

            });



        }


    );


};






// ==========================
// DELETE USER
// ==========================

const deleteUser = (req,res)=>{


    const id=req.params.id;



   const sql =
"DELETE FROM users WHERE user_id=?";


    db.query(sql,[id],(err)=>{


        if(err){

            return res.status(500).json({

                message:err.message

            });

        }



        res.json({

            success:true,
            message:"User Deleted Successfully"

        });



    });



};





module.exports={


    getUsers,
    addUser,
    updateUser,
    deleteUser


};