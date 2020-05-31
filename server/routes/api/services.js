const Router = require('@koa/router');
const { services } = require('./../../controllers');

const router = new Router();

router.get('/services', services.getServices);

module.exports = router;
