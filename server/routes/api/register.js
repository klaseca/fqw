const Router = require('@koa/router');
const { users } = require('./../../controllers');

const router = new Router();

router.post('/register', users.create);

module.exports = router;
