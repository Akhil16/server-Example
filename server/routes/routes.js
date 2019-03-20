const express = require('express');
const router = express.Router();

const vendor = require('../controllers/vendor.controller');

router.post('/register', vendor.registerVendor);

module.exports = router;