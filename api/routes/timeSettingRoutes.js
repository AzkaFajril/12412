const express = require('express');
const router = express.Router();
const { getTimeSetting, updateTimeSetting } = require('../controllers/timeSettingController');

// GET: /api/time-setting
router.get('/', getTimeSetting);

// PUT: /api/time-setting
router.put('/', updateTimeSetting);

module.exports = router;
