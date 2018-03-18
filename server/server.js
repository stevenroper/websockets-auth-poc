const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

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

http.listen(8080, () => {
  console.log('Listening on localhost:8080...');
});