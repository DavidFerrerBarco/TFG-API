const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const router = require('./routes/mainRouter');
var bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error(error));

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) } );