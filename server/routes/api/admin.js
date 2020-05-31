const Router = require('@koa/router');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const { dashboard } = require('../../controllers');

const router = new Router();

const withAuth = passport.authenticate('jwt', { session: false });

router.get('/admin', withAuth, dashboard.checkToken);

router.post('/admin/login', ctx => {
  return passport.authenticate('admin', { session: false }, (err, user) => {
    if (err) {
      ctx.body = { status: 'fail', message: err };
    } else if (!user) {
      ctx.status = 401;
      ctx.body = { status: 'fail', message: 'Невереый логин или пароль' };
    } else {
      const token = jwt.sign(user, 'zzz');
      ctx.body = { status: 'success', user: { ...user, token } };
    }
  })(ctx);
});

router.post('/admin/getusers', withAuth, dashboard.getUsers);

router.post('/admin/getorders', withAuth, dashboard.getOrders);

router.patch('/admin/updateorderstatus', withAuth, dashboard.updateOrderStatus);

router.patch('/admin/updateservices', withAuth, dashboard.updateServices);

module.exports = router;
