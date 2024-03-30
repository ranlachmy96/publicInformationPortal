const cors = require('cors');
const express = require('express');
const logger = require('./loggers/logger');
const { Server } = require("socket.io");
const http = require("http");
require('dotenv').config();
// const { errorHandler } = require('./middlewares/errorHandler');
const { InstructionsRouter } = require('./routers/InstructionsRouter.router');
const { OrganizationsRouter } = require('./routers/OrganizationsRouter.router');


const app = express();
const port = process.env.PORT || 3000;

// Allow requests from any origin
// Configure CORS with dynamic origin
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests from any origin
    callback(null, true);
  },
  credentials: true // Allow credentials (e.g., cookies, authorization headers)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/instructions', InstructionsRouter);
app.use('/organizations', OrganizationsRouter);

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});


// Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});
server.listen(4000, () => {
  console.log("listening on *:4000");
});