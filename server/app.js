const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session2');
const passport = require('koa-passport');
const apiRouter = require('./routes/api/apiRouter');
require('./config/passport');

const app = new Koa();

app.use(bodyParser());
app.use(session({ key: 'SESSIONID' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(apiRouter.routes(), apiRouter.allowedMethods());

module.exports = app;
