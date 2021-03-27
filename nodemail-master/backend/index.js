const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const  http = require('http')
const routes = require('./routes')
const app = express()

app.use(bodyParser.json());

app.use(cors())
app.use(express.json())
app.use(routes)

const server = http.createServer(app)

server.listen(3030)
