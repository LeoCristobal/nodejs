const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');

router.route('/')
    .get(AuthController.handleLogin)
    .post(AuthController.handleLogin)

module.exports = router;