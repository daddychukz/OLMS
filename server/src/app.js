// bringing in dependencies
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Chuks Books',
    version: '1.0.0',
    description: 'An Online Library Management System API Documentation',
    contact: {
      name: 'Durugo Chukwukadibia',
      url: 'https://chuks-books.herokuapp.com/',
      email: 'durugo_chuks@yahoo.com'
    },
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['server/dist/routes/index.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(express.static('server/public'));

// connect all routes to application
app.use('/', routes);

const port = +process.env.PORT || 3000;
app.set('port', port);

// http.createServer(app).listen(port, () => {
//   console.log(`The server is listening on port ${port}`);
// });

// Turn on the server

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

export default app;
