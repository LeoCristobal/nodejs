const express = require('express');
const router = express.Router();
const refreshTokenController = require('../../controllers/RefreshTokenController');

router.route('/')
    .get(refreshTokenController.handleRefreshToken)
    .post(refreshTokenController.handleRefreshToken)

module.exports = router;