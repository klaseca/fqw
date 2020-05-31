const Router = require('@koa/router');
const loginRouter = require('./login');
const registerRouter = require('./register');
const profileRouter = require('./profile');
const servicesRouter = require('./services');
const adminRouter = require('./admin');

const apiRouter = new Router();

const nestedRoutes = [
  loginRouter,
  registerRouter,
  profileRouter,
  servicesRouter,
  adminRouter
];

nestedRoutes.forEach(router => {
  apiRouter.use(router.routes(), router.allowedMethods());
});

module.exports = apiRouter;
