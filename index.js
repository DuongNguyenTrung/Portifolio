import express from "express"
import cors from "cors"
const app = express();
import dbconnect from'./src/config/db/index.js'
import bodyParser from "body-parser"
import route from './src/routes/index.js'
import dotenv from 'dotenv'
import clientRedis from './src/config/Redis/clientRedis'
dotenv.config()
const port = process.env.PORT || 3000
app.use(cors())
// Bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//Connect MongoDB
dbconnect();
//Router
route(app)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})