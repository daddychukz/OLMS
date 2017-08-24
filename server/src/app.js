// bringing in dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const http = require('http');
const routes = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connect all routes to application
app.use('/', routes);

const port = +process.env.PORT || 3000;
app.set('port', port);

// http.createServer(app).listen(port, () => {
//   console.log(`The server is listening on port ${port}`);
// });

// Turn on the server
app.listen(port, () => {
  console.log(`The App is listening on port ${port}`);
});

