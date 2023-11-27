const db = require('../config/db')
const {v4: uuid4} = require('uuid')

const imageController = {
    add: (req, res) => {
        const {originalname, size, path, mimetype} = req.file
        const imageUrl = `http://localhost:5000/${req.file.path}`
        db.query(`INSERT INTO images (images_id, images_filename, images_size, images_path, images_mimetype, images_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [uuid4(), originalname, size, path, mimetype, imageUrl], (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: err.message
                })
            }
            return res.status(201).send({
                message: `Success add image ${originalname}`,
                data: result.rows[0]
            })
        })
    },
    delete: (req, res) => {
        db.query(`DELETE from images WHERE images_filename='${req.params.image}'`, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message
                })
            }
            if (result.rowCount == 0) {
                return res.status(400).send({
                    message: "Image not found"
                })
            }
            return res.status(200).send({
                message: `Deleted ${req.params.image} success`
            })
        })
    }
}

module.exports = imageController
