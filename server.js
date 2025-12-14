const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/LogEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://yourwebsite.com', 'http://localhost:0000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/subdir', express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/subdir', require('./routes/subdir'));
app.use('/', require('./routes/root'));

app.use('/employees', require('./routes/api/employees'));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/views', '404.html'))
})

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));