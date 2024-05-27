require('dotenv').config();
require('express-async-errors');
const cors = require('cors'); 

// express
const express = require('express');
const app = express();
const server = require('http').createServer(app);

// const mongoose = require("mongoose");
const connectDB = require('./db/connect');

// mongoose.connect("mongodb://localhost:27017/docs-clone");


const {authenticateUser} = require("./sockets/authentication")


const io = require("socket.io")(server, {
    transports:["websocket"],
    cors: {
        origin: "http://localhost:3000", // replace with your client's origin
        methods: ["GET", "POST", "PATCH"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});
const cookieParser = require('cookie-parser');
const userRouter = require('./user/routes');
const documentRouter = require('./document/routes')

// middlewares 
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');



// Add body-parser middleware
app.use(cors({
    origin: 'http://localhost:3000', // replace with your client's origin
    credentials: true
}));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser(process.env.JWT_SECRET));


app.use('/api/v1/users', userRouter);
app.use('/api/v1/documents',documentRouter);


app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);



io.on("connection", (socket) => {
    console.log("New client connected");
})
io.use((socket, next) => authenticateUser(socket, socket.request, {}, next));
require("./sockets/documentSocket")(io)


// server 
const PORT = process.env.PORT || 8000;
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
