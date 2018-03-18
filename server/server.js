const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  if (req.body.username === 'steven' && req.body.password === 'testing') {
    res.status = 200;
    res.json({ token: 'supersecrettoken' });
  }
  else {
    res.statusCode = 401;
    res.statusMessage = 'Username and password do not match.';
    res.end();
  }
});

io.on('connection', socket => {
  console.log('user connected');
  let intervalId;

  socket.on('loggedIn', () => {
    let countdown = 15;
    intervalId = setInterval(() => {
      countdown--;
      if (countdown === 0) {
        io.emit('logout');
        clearInterval(intervalId);
        console.log('automatically logged out');
      }
      else {
        io.emit('countdown', countdown);
      }
    }, 1000);
  });
  socket.on('manualLogout', () => {
    console.log('manually logged out');
    clearInterval(intervalId);
  });
});

http.listen(8080, () => {
  console.log('Listening on localhost:8080...');
});