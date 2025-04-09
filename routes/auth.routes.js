const express = require('express');
const { RegisterProvider } = require('../controller/providers.controller');
const router = express.Router();

router.post('/register',RegisterProvider);

module.exports = router;