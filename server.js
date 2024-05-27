require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const mongoose = require("mongoose");
const connectDB = require('./db/connect');

// mongoose.connect("mongodb://localhost:27017/docs-clone");

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const cookieParser = require('cookie-parser');
const userRouter = require('./user/routes');
const documentRouter = require('./document/routes')

// middlewares 
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');


app.use('/api/v1/users', userRouter);
app.use('/api/v1/documents',documentRouter);


app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

require("./sockets/documentSocket")(io)


// server 
const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        server.listen(PORT, ipAddress='localhost', () => {
            console.log(`Server is listening on port : ${PORT} ...`);
            console.log(`http://${ipAddress}:${PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
}
start();
