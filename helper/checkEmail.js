const db = require('../config/db')

const checkEmail = {
    check: (req, res, next) => {
        console.log(req.body)
        db.query(`SELECT * from users WHERE users_email='${req.body.email}'`, (err, result) => {
            if (err) {
                if (err.code == '23505') {
                    return res.status(400).send({
                        message: `User ${email} already exist. Please another email`
                    })
                }
                return res.status(400).send({
                    message: err.message
                })
            } else {
                return next()
            }
        })
    }
}

module.exports = checkEmail