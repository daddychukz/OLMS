const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res) =>
  res.status(200).send({
    message: 'Online Library Management System',
  })
);

/* All API Routes */


// A catch-all routes not define.
router.get('*', (req, res) => res.status(404).send(
  'Invalid Route...'
));

module.exports = router;
