const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
// const { logger } = require('./middleware/LogEvents');
// const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3000;

// custom middleware logger
// app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve static file
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));
app.use('/register', require('./routes/api/register'));
app.use('/login', require('./routes/api/auth'));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/views', '404.html'))
})

// app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));