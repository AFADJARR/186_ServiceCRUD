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

app.put("/biodata/:id", (req, res) => {
  const { id } = req.params;
  const { nama, nim, kelas } = req.body;

  pool
    .query(
      "UPDATE biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4 RETURNING *",
      [nama, nim, kelas, id],
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Data tidak ditemukan",
        });
      }
      res.json({
        message: "Data berhasil diupdate",
        data: result.rows[0],
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});


app.delete("/biodata/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM biodata WHERE id = $1 RETURNING *", [id])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Data tidak ditemukan",
        });
      }
      res.json({
        message: "Data berhasil dihapus",
        data: result.rows[0],
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});