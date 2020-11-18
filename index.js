
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoDbConnection = require ('./db/db');
const routes = require('./routes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoDbConnection()
app.use(routes)
// app.get('/', (req, res, next) => {
//     res.send('Hello World')
// })
app.listen(port, () => console.log(`Listening on port ${port}`));