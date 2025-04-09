const express = require('express');
const { getNotifications, createNotifications } = require('../controller/notification.controller');
const router = express.Router();


router.get('/janaza', getNotifications)
router.post('/janaza', createNotifications)



module.exports = router