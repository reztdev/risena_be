const db = require('../config/db')
const { v4: uuid4 } = require('uuid')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const authController = {
    allUsers: (req, res) => {
        db.query('SELECT * from users', (err, result) => {
            if (err) return res.status(500).send({
                message: err.message,
                data: []
            })
            return res.status(200).send({
                message: "Get all users",
                count: `Total ${result.rowCount} user on database`,
                data: result.rows
            })
        })
    },
    login: async (req, res) => {
        const { email, password } = req.body
        try {
            db.query(
                'SELECT * from users WHERE users_email=$1', [email], async (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: err.message,
                            data: {}
                        })
                    }
                    if (result.rows.length == 0) {
                        return res.status(401).send({
                            message: "Login failed. User not found"
                        })
                    }
                    const validPassword = await argon2.verify(result.rows[0].users_password, password)
                    if (!validPassword) {
                        return res.status(401).send({
                            message: "Login failed. wrong password"
                        })
                    }
                    const token = jwt.sign({
                        id: result.rows[0].id_users,
                        email: result.rows[0].users_email, // (optional)
                        role: result.rows[0].users_role,
                    }, 's3cr3t!@#$%^&*()_+_)(*&^%')
                    return res.status(201).send({
                        message: "Login success",
                        data: {
                            token: token,
                            data: result.rows[0]
                        }
                    })
                }
            )
        } catch (error) {
            return res.status(500).send({
                message: error.message,
                data: {}
            });
        }
    },
    register: async (req, res) => {
        const { name, email, password } = req.body
        try {
            const hash = await argon2.hash(password)
            db.query(
                `INSERT INTO users (id_users, users_name, users_email, users_password, users_role) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuid4(), name, email, hash, 'user'], (err, result) => {
                    if (err) {
                        if (err.code == '23505') {
                            return res.status(400).send({
                                message: `user ${email} sudah ada.`
                            })
                        }
                        return res.status(500).send({
                            message: err.message,
                            data: {}
                        })
                    }
                    
                    return res.status(201).send({
                        message: "Register success",
                        data: result.rows[0]
                    })
                }
            )
        } catch (error) {
            return res.status(500).send({
                message: error.message,
                data: {}
            })
        }
    },
    delete: (req, res) => {
        db.query(`DELETE from users WHERE users_email='${req.params.email}'`, (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: err.message,
                })
            }
            if (result.rowCount == 0) {
                return res.status(400).send({
                    message: "User not found"
                })
            }
            return res.status(200).send({
                message: `Deleted ${req.params.email} success`
            })
        })
    }
}

module.exports = authController