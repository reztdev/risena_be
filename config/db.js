const { Pool } = require('pg')

const db = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'risena_store',
    user: 'postgres',
    password: ''
})

db.connect((err) => {
    if(err) return console.log(`ERROR: ${err.message} code: ${err.code}`)
    console.log('[INFO] Success connect database')
})

module.exports = db