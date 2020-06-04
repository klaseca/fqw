const Router = require('@koa/router');
const passport = require('koa-passport');
const { profile } = require('./../../controllers');

const router = new Router();

const withAuth = passport.authenticate('jwt', { session: false });

router.get('/profile', withAuth, profile.checkToken);

router.post('/profile/cabinet', withAuth, profile.getCabinetData);

router.post('/profile/neworder', withAuth, profile.createNewOrder);

router.post('/profile/myorders', withAuth, profile.getMyOrders);

router.patch('/profile/updateuser', withAuth, profile.updateData);

router.patch('/profile/updatecar', withAuth, profile.updateCar);

router.del('/profile/deletecar', withAuth, profile.deleteCar);

router.post('/profile/addcar', withAuth, profile.addCar);

router.post('/profile/getorder', withAuth, profile.getOrder);

router.post('/profile/createreport', withAuth, profile.createReport);

module.exports = router;
