// const express = require('express');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const cors = require('cors');
// require('dotenv').config();

// const PORT = process.env.PORT || 8000; // Установите порт по умолчанию

// const app = express();

// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use('/api/user', require("./routes/users"));
// app.use('/api/todos', require('./routes/todos'));

// // Обработчик корневого маршрута
// app.get('/', (req, res) => {
//     res.send("Welcome to the API");
// });

// // Экспортируйте приложение
// module.exports = app;


const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/user', require("./routes/users.js"));
app.use('/api/todos', require("./routes/todos"));

app.get('/', (req, res) => {
    res.send("Welcome to the API");
});
module.exports = app;