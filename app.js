const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')
const path = require('path')

const connectDB = require('./config/db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

//PAssport
app.use(passport.initialize());
require('./config/passport.config')(passport);

//Routes
app.use('/api/user/', require('./routes/api/user.route'));
app.use('/api/post/', require('./routes/api/post.route'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;