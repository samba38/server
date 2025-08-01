const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'example.db')

let db = null

const nitializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

nitializeDBAndServer()

app.get('/doctors', async (request, response) => {
  const selectQuery = `
    SELECT * FROM Details;
   `
  const result = await db.all(selectQuery)
  response.send(result)
})
