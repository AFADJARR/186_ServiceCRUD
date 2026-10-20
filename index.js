import express from 'express'
import pg from 'pg'
const app = express()
const port = 3000
const { Pool } = pg

app.use (express.json())
app.use(
    express.urlencoded(
        {extended: true})
)

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Mahasiswa',
    password: 'Afdjr6768',
    port: 5432,
})

app.get('/', (req, res) => {
    console.log("TEST DATA : ");

    pool.query('SELECT * FROM Biodata ORDER by id')
        .then(result => {
            res.send(result.rows)
        });
});