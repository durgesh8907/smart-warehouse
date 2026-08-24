const db = require("../config/db");
const bcrypt = require("bcrypt");

// ==========================
// REGISTER USER
// ==========================
const registerUser = async (req, res) => {
    try {

        const {
            full_name,
            email,
            phone,
            password,
            role
        } = req.body;

        // Validation
        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        // Check Email Exists
        const checkEmail = "SELECT * FROM users WHERE email = ?";

        db.query(checkEmail, [email], async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered"
                });
            }

            // Hash Password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert User
            const sql = `
                INSERT INTO users
                (full_name, email, phone, password, role)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
                sql,
                [
                    full_name,
                    email,
                    phone,
                    hashedPassword,
                    role || "Employee"
                ],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: "User Registered Successfully"
                    });

                }
            );

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// LOGIN USER
// ==========================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const sql = "SELECT * FROM users WHERE email = ?";

        db.query(sql, [email], async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Email"
                });
            }

            const user = result[0];

            // Compare Password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Password"
                });
            }

            // Login Success
            res.status(200).json({
                success: true,
                message: "Login Successful",

                user: {
                    id: user.user_id,
                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            });

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// EXPORT
// ==========================
module.exports = {
    registerUser,
    loginUser
};