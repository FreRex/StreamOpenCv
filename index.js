const cv = require('opencv4nodejs-prebuilt');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const wCap = new cv.VideoCapture(0);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

setInterval(()=> {
	const frame = wCap.read();
	const image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image', image);
}, 1000)

server.listen(3000, () => {
  console.log('http://localhost:3000');
});

