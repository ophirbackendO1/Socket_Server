const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

host = null;
// host = process.env.ONLINE_HOST;
port = process.env.PORT;

io.on("connection", (socket) => {
  console.log(
    "An user is connecting to the server with socket_id : " + socket.id
  );

  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("order-event", (data) => {
    console.log("An user placed an order now!");
    io.emit("order-event", data);
  });

  socket.on("table-event", (data) => {
    console.log("Table status changed!");
    io.emit("table-event", data);
  });

  socket.on("migrate-table-event", (data) => {
    console.log("Table status changed!");
    io.emit("migrate-table-event", data);
  });

  socket.on("disconnect", () => {
    console.log("An user is disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Socket server running at port : " + port);
});

app.post("/order-event", (req, res) => {
  const event = req.body.event;
  const data = req.body.data;
  1;

  io.emit(event, data);
  io.emit("table-event", data);

  console.log("An user placed an order now!");

  res.json({ status: "Event emitted successfully", event: event, data });
});

app.post("/table-event", (req, res) => {
  const event = req.body.event;
  const data = req.body.data;

  io.emit("table-event", data);

  console.log("A " + data.old_status + " table is " + data.status + " now!");

  res.json({ status: "Event emitted successfully", event: event, data });
});

app.post("/migrate-table-event", (req, res) => {
  const event = req.body.event;
  const data = req.body.data;

  io.emit("migrate-table-event", data);

  console.log(
    "Orders from table_id " +
      data.old_table_id +
      " migrated to table_id " +
      data.new_table_id
  );

  res.json({ status: "Event emitted successfully", event: event, data });
});

//run server
if (host != null) {
  server.listen(port, host, () => {
    console.log("Socket server running at : http://" + host + ":" + port);
  });
} else {
  server.listen(port, () => {
    console.log("Socket server running at : http://your-domain");
  });
}
