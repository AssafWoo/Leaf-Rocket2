const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//import routes
const authRoute = require('./routes/auth');
const testRoute = require('./routes/tests');

dotenv.config();

//connect to DB
mongoose.connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

//middlewares
app.use(express.json());

//route middlewares
app.use('/', authRoute);
app.use('/dashboard', testRoute);

app.listen(7000, () => console.log('Server is up and running...'))