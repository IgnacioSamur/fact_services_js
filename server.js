require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer(app);

app.use(express.json());

require('./src/routes')(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//javascript