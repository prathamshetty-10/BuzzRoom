import express from 'express'
const app = express();
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io';
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
//it is based on events few events are connection,join_room etc 
//io.on means we listening for the inside named event and when it occurs that callback runs

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
    //all these are listened to after connection done
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    
    socket.to(data.room).emit("receive_message", data);//now server is emitting
  });
  //even on refresh it disconnects and connects back
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});