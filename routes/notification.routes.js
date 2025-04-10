const express = require('express');
const { getNotifications } = require('../controller/notification.controller');
const router = express.Router();


router.get('/janaza', getNotifications)




module.exports = router