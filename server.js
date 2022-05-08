const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//  Load env vars
dotenv.config({ path: './config/config.env' });

//  Connect to database
connectDB();

//  Route files
const itemRoute = require('./routes/ItemRoute');



const app = express();

//  Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

// moint routers
app.use('/api/item', itemRoute);

app.use(errorHandler);

const PORT = process.env.PORT | 5000;

const server = app.listen(PORT,
    console.log(`Server runnnig in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


//  Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //  Close server & exit process
    server.close(() => process.exit(1));
});