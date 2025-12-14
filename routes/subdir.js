const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public/views', 'subdir', 'index.html'));
});

router.get('/test', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public/views', 'subdir', 'test.html'));
});

module.exports = router;