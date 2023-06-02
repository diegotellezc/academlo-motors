const cors = require('cors');
const express = require('express');

//routes
const usersRouter = require('./routes/users.routes');
const repairsRouter = require('./routes/repairs.routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

module.exports = app;
