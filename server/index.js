require('dotenv').config();
const http = require('http');
const app = require('./app');

http.createServer(app.callback()).listen(process.env.PORT, () => {
  console.log('Server started, UwU');
});
