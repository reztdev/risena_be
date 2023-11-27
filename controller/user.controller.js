const db = require('../config/db')
const { v4: uuid4 } = require('uuid')
const argon2 = require('argon2')

const userController = {
    addUser: async (req, res) => {
        let { name, email, password, role } = req.body
        console.log(req.file)
        const image = `http://localhost:5000/${req.file.path}`
        try {
            const hash = await argon2.hash(password)
            if (role == null) { role = "user" }
            db.query(
                `INSERT INTO users (id_users, users_name, users_email, users_password, users_image, users_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [uuid4(), name, email, hash, image , role], (err, result) => {
                    if (err) {
                        if (err.code == '23505') {
                            return res.status(400).send({
                                message: `User ${email} already exist. Please another email`
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
    }
}

module.exports = userController