const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./config/db')
app.use(cors())
const productsController = require('./controller/products.controller')
const authController = require('./controller/auth.controller')
const userController = require('./controller/user.controller')
const verifyToken = require('./helper/verifyToken')
const upload = require('./helper/multer')
const imgUpload = require('./controller/image.controller')
const checkMail = require('./helper/checkEmail')

const port = 5000
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended: true}))

app.post('/api/image', upload.single('image') , imgUpload.add)

// Products
app.get('/api/products', productsController.getAll)
app.get('/api/products/:slug', productsController.getBySlug)
app.post('/api/products/', upload.array('image'), productsController.add)
app.patch('/api/products/:products_slug', upload.single('image'), productsController.update)
app.put('/api/products/:product', upload.single('image'), productsController.replace)
app.delete('/api/products/:slug', productsController.delete)
// Auth
app.get('/api/auth', authController.allUsers)
app.post('/api/auth/register', authController.register)
app.post('/api/user', checkMail.check, upload.single('image'), userController.addUser)
app.post('/api/auth/login', authController.login)
app.delete('/api/auth/:email', authController.delete)

// Products
// app.get('/api/products', productsController.getAll)
//app.get('/api/products/:slug', productsController.getBySlug)
//app.post('/api/products/', upload.array('image'), productsController.add)
//app.patch('/api/products/:products_slug', upload.single('image'), productsController.update)
//app.put('/api/products/:product',verifyToken.isSuperAdmin, upload.single('image'), productsController.replace)
//app.delete('/api/products/:slug',verifyToken.isSuperAdmin, productsController.delete)
// Auth
//app.get('/api/auth', verifyToken.isSuperAdmin, authController.allUsers)
//app.post('/api/auth/register', authController.register)
//app.post('/api/user', verifyToken.isSuperAdmin, checkMail.check, upload.single('image'), userController.addUser)
//app.post('/api/auth/login', authController.login)
//app.delete('/api/auth/:email', verifyToken.isSuperAdmin, authController.delete)

app.listen(port, ()=> {
    console.log(`[INFO] Server already running http://localhost:${port}`)
})


// // install package
// // npm i pg
// // npm i uuid
// // npm i slugify
