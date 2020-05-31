const Router = require('@koa/router');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const router = new Router();

router.post('/login', ctx => {
  return passport.authenticate('local', { session: false }, (err, user) => {
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

module.exports = router;
