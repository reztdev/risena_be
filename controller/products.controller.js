const db = require('../config/db')
const { v4: uuid4 } = require('uuid')
const { toSlug } = require('../helper')


const productsController = {
    getAll: (req, res) => {
        db.query(`SELECT products.*, (SELECT array_agg(images_url) FROM images WHERE images.id_products=products.id_products) as images FROM products`, (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: err.message
                })
            }
            return res.status(200).send({
                message: "Success get all products",
                data: result.rows
            })
        })
    },
    getBySlug: (req, res) => {
        db.query(`SELECT products.*, (SELECT array_agg(images_url) FROM images WHERE images.id_products=products.id_products) as images FROM products WHERE products_slug='${req.params.slug}'`, (err, result) => {
            if (err) return res.status(500).send({
                message: err.message,
                data: []
            })
            if (result.rowCount == 0) return res.status(400).send({
                message: "Produk tidak di temukan",
                data: {}
            })
            return res.status(200).send({
                message: "success get all products",
                data: result.rows[0]
            })
        })
    },
    addProduct: (req, res) => {
        upload.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.status(401).send({
                    message: err.message
                })
            } else if (err) {
                res.status(401).send({
                    message: err.message
                })
            }
            const {name, price, description, stock, category} = req.body
            console.log(req.body)
            console.log(req.file)
            if (req.file) {
                const image = req.file.filename
            }
            db.query(`INSERT INTO products (id_products, products_name, products_price, products_description, products_stock, products_category, products_image, products_slug) VALUES ('${uuid4()}','${name}', '${price}','${description}', '${stock}', '${category}', '${image}', '${toSlug(name)}') RETURNING *`, (err, result) => {
            
                if (err) return res.status(500).send({
                    message: err.message,
                    data: []
                })
                return res.status(200).send({
                    mesage: "Success add new product",
                    data: result.rows[0]
                })
            })
        })
    },
    add: (req, res) => {
        console.log(req.files)
        const {name, price, description, stock, category} = req.body
        db.query(`INSERT INTO products (id_products, products_name, products_price, products_description, products_stock, products_category, products_slug) VALUES ('${uuid4()}','${name}', '${price}','${description}', '${stock}', '${category}', '${toSlug(`${name}-${Date.now()}`)}') RETURNING *`, (err, result) => {
            
            if (err) return res.status(500).send({
                message: err.message,
                data: []
            })
            if (req.files.length > 0) {
                req.files.map((item) => {
                    db.query(`INSERT INTO images (images_id, images_filename, images_size, images_path, images_mimetype, images_url, id_products ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [uuid4(), item.filename, item.size, item.path, item.mimetype, `http://localhost:5000/${item.path}`, result.rows[0].id_products])
                })
            }
            return res.status(201).send({
                message: 'success add new product',
                data: {...result.rows[0], images: req.files}
            })
        })
    },
    update: (req, res) => {
        db.query(`SELECT * from products WHERE products_slug='${req.params.products_slug}'`, (err, result) => {
            const {
                name = result.rows[0].products_name,
                price = result.rows[0].products_price,
                description = result.rows[0].products_description,
                stock = result.rows[0].products_stock,
                categories = result.rows[0].products_category,
                image = result.rows[0].products_image
            } = req.body
            db.query(`UPDATE products SET products_name='${name}', products_price='${price}', products_description='${description}', products_stock='${stock}', products_category='${categories}', products_image='${image}', products_slug='${toSlug(name)}' WHERE products_slug='${req.params.products_slug}' RETURNING *`, (err, updateResult) => {
                if (err) return res.status(500).send({
                    message: err.message,
                    data: []
                })
                return res.status(201).send({
                    message: 'Success patch products',
                    data: updateResult.rows[0]
                })
            })
        })
    },
    replace: (req, res) => {
        const { name, price, description, stock, categories, image } = req.body
        if (!name || !price || !description || !stock || !categories || !image ) {
            return res.status(400).send({
                message: "Data tidak boleh kosong"
            })
        }
        db.query(`UPDATE products SET products_name='${name}', products_price='${price}', products_description='${description}', products_stock='${stock}', products_category='${categories}', products_image='${image}', products_slug='${toSlug(name)}' WHERE products_slug='${req.params.product}' RETURNING *`, (err, productUpdate) => {
            if (err) {
                return res.status(500).send({
                    message: err.message,
                    data: []
                })
            }
            return res.status(200).send({
                message: "Success update product",
                data: productUpdate.rows[0]
            })
        })
    },
    delete: (req, res) => {
        db.query(`DELETE from products WHERE products_slug='${req.params.slug}'`, (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: err.message,
                    data: []
                })
            }
            return res.status(200).send({
                message: `Product ${req.params.slug} delete success`
            })
        })
    },
    uploadImage: (req, res) => {
        const {filename} = req.body
        db.query('INSERT INTO images (filename) VALUES ($1))', [filename], (err, result) => {
            if (err) {
                return res.status(400).send({
                    message: err.message
                })
            }
            return res.status(201).send({
                message: "File image upload success",
                data: result.rows[0]
            })
        }) 
    },
}


module.exports = productsController
