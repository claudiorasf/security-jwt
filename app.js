const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const contactRoutes = require('./src/routes/contactRoutes');

const app = express();
const PORT = process.env.PORT;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT - Validate the user (Authorization Header)
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY, (err, decode) => {
            if (err) {
                req.user = undefined;
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        req.user = undefined;
        next();
    }
})

app.use('/', contactRoutes);

// serving static files
app.use(express.static('public'));

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);