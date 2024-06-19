const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToDB = require('./config/db');
const router = require('./routes/index');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
const port = 8080;

// Set up CORS
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(cookieParser())
// Increase the request size limit
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Parse application/json
app.use(express.json());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/', router);

//cookies


// Connect to the database and start the server
connectToDB().then(() => {
    app.listen(port, () => {
        console.log("connected to DB");
        console.log(`App is listening at port ${port}`);
    });
}).catch(error => {
    console.error("Error connecting to the database", error);
});
