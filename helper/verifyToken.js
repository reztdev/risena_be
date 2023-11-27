const jwt = require('jsonwebtoken')

const verifyToken = {
    public: () => {},
    isAdmin: (req, res, next) => {
        console.log(req.headers)
        if (req.headers['authorization']) { 
            const bearerToken = req.headers['authorization'].split(' ')[1]
            console.log(bearerToken)
            const verify = jwt.verify(bearerToken, 's3cr3t!@#$%^&*()_+_)(*&^%')
            if (verify.role == "admin") {
                return next()
            }
            return res.status(403).send({
                message: "Forbidden"
            })
        } else {
            return res.status(401).send({
                message: "Unauthorized",
            })
        }
    },
    isUser: (req, res, next) => {
        console.log(req.headers)
        if (req.headers.authorization) {
            const bearerToken = req.headers.authorization.split(' ')[1]
            const verify = jwt.verify(bearerToken, 's3cr3t!@#$%^&*()_+_)(*&^%')
            if (verify.role == "user") {
                return next()
            }
            return res.status(403).send({
                message: "Forbidden"
            })
        } else {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
    },
    isAdminAndUser: (req, res, next) => {
        if (req.headers.authorization) {
            const bearer = req.headers.authorization.split(' ')[1]
            const verify = jwt.verify(bearer, 's3cr3t!@#$%^&*()_+_)(*&^%')
            if (verify.role == "admin" || verify.role == "user") {
                return next()
            }
            return res.status(403).send({
                message: "Forbidden"
            })
        } else {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
    },
    isSuperAdmin: (req, res, next) => {
        console.log(req.headers)
         if (req.headers['authorization-x']) {
            const brToken = req.headers['authorization-x']
            const verify = jwt.verify(brToken, 's3cr3t!@#$%^&*()_+_)(*&^%')
            if (verify.role == "super admin") {
                return next()
            }
            return res.status(403).send({
                message: "Forbidden"
            })
        } else {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
    },
}

module.exports = verifyToken
