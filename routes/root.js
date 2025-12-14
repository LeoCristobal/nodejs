const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public/views', 'index.html'));
});
router.get('/new', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public/views', 'newpage.html'));
});

module.exports = router;