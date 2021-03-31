const express = require('express');
const httpStatus = require('http-status');
const cors = require('cors');
const myRoutes = require('./routes');
const ApiError = require('./utils/ApiError');
const app = express();

// parse json request body
app.use(express.json());

//enable cors
app.use(cors());
app.options('*', cors());

//routes
app.use('/', myRoutes);


//send back 404 for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'))
})

app.listen(8000, () => {
    console.log('Server running on port 8000...')
})
