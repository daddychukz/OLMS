const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = +process.env.PORT || 3000;
app.set('port', port);

http.createServer(app).listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

/* GET home page. */
app.get('/', (req, res) =>
  res.status(200).send({
    message: 'Online Library Management System',
  })
);

// A catch-all routes not define.
app.get('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

module.exports = app;
