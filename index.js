const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
	console.log('Server is running on port', port);
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {

	// Starting Socket when a user entered the url
	socket.on('userstatus', (status) => {
		io.emit('userstatusreciever', status);
	});

	socket.on('username', (username) => {
		// console.log('message: ' + msg );
		io.emit('username', username);
	});

	socket.on('message', (msg) => {
		// console.log('message: ' + msg );
		io.emit('message', msg);
	});

	socket.on('disconnect', () => {
		// console.log('user disconnected');
		io.emit('message', 'user disconnected');
	});
})