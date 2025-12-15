const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = 3000;

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// serve static file
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/api/register'));
app.use('/login', require('./routes/api/auth'));

app.use('/refresh', require('./routes/api/refresh'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));