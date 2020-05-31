require('dotenv').config();
const http = require('http');
const { sequelize } = require('./models');
const app = require('./app');

sequelize.sync({ forse: true }).then(async () => {
  http.createServer(app.callback()).listen(process.env.PORT, () => {
    console.log('Server started, UwU');
  });
});
