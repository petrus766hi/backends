
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoDbConnection = require ('./config/db');
const routes = require('./routes')
var cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoDbConnection()
app.use(cors())
app.use(routes)
app.get('/', (req, res, next) => {
    res.send('Hello World')
})
app.listen(port, () => console.log(`Listening on port ${port}`));