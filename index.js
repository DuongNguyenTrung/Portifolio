import express from "express"
import cors from "cors"
const app = express();
import dbconnect from'./src/config/db/index.js'
import morgan from "morgan"
import bodyParser from "body-parser"
import route from './src/routes/index.js'
import dotenv from 'dotenv'
import clientRedis from './src/config/Redis/clientRedis'
// import { cpus } from 'os';
// process.env.UV_THREADPOOL_SIZE = cpus().length
dotenv.config()
const port = process.env.PORT || 3000
app.use(cors())
app.use(morgan('combined'))
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