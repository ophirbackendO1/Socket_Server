// const http = require("http");
// const socketIo = require("socket.io");
// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// app.use(bodyParser.json());

// const server = http.createServer();
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//   },
// });

// host = "192.168.100.13";

// io.on("connection", (socket) => {
//   console.log(
//     "An user is connecting to the server with socket_id : " + socket.id
//   );

//   socket.on("message", (data) => {
//     io.emit("message", data);
//   });

//   socket.on("order-event", (data) => {
//     console.log("An user placed an order now!");
//     io.emit("order-event", data);
//   });

//   socket.on("table-event", (data) => {
//     console.log("Table status changed!");
//     io.emit("table-event", data);
//   });

//   socket.on("migrate-table-event", (data) => {
//     console.log("Table status changed!");
//     io.emit("migrate-table-event", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("An user is disconnected");
//   });
// });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/ping", (req, res) => {
//   res.send("pong");
// });

// app.post("/order-event", (req, res) => {
//   res.json({ status: "Event emitted successfully" });
//   // const event = req.body.event;
//   // const data = req.body.data;1

//   // io.emit(event, data);
//   // io.emit("table-event", data);

//   // console.log("An user placed an order now!");

//   // res.json({ status: "Event emitted successfully", event: event, data });
// });

// app.post("/table-event", (req, res) => {
//   const event = req.body.event;
//   const data = req.body.data;

//   io.emit("table-event", data);

//   console.log("A " + data.old_status + " table is " + data.status + " now!");

//   res.json({ status: "Event emitted successfully", event: event, data });
// });

// app.post("/migrate-table-event", (req, res) => {
//   const event = req.body.event;
//   const data = req.body.data;

//   io.emit("migrate-table-event", data);

//   console.log(
//     "Orders from table_id " +
//       data.old_table_id +
//       " migrated to table_id " +
//       data.new_table_id
//   );

//   res.json({ status: "Event emitted successfully", event: event, data });
// });

// app.listen(4000, () => {
//   console.log("Api server running at port 4000");
// });

// server.listen(3000,host, () => {
//   console.log("Socket server running at port 3000");
// });

// // app.listen(4000, () => {
// //   console.log("Api server running at 127.0.0.1:4000");
// // });

// // server.listen(3000, host, () => {
// //   console.log("Socket server running at " + host + ":3000");
// // });

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.write(`<h1>Socket IO Start on Port : ${PORT}</h1>`);
    res.end();
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (ms) => {
        io.emit('message', ms);
    });
});

server.listen(PORT, () => {
    console.log('listening on *:3000');
});
