const express = require('express');

const router = express.Router();

//* route     POST api/users
//* desc      Register User
//* access    Public
router.post('/', (req, res) => {
  res.status(200).json({ data: req.body });
});

module.exports = router;
