const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const { users, admins } = require('../controllers');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const user = await users.findUser(email);

      if (!user) {
        return done(null, false);
      }

      if (password !== user.password) {
        return done(null, false);
      }

      return done(null, {
        userId: user.dataValues.userId,
        email: user.dataValues.email,
        phone: user.dataValues.phone,
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName
      });
    }
  )
);

passport.use(
  'admin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const admin = await admins.findAdmin(email);

      if (!admin) {
        return done(null, false);
      }

      if (password !== admin.password) {
        return done(null, false);
      }

      return done(null, {
        adminId: admin.dataValues.adminId,
        email: admin.dataValues.email,
        phone: admin.dataValues.phone,
        firstName: admin.dataValues.firstName,
        lastName: admin.dataValues.lastName
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'zzz'
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);
