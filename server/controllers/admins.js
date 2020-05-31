const jwt = require('jsonwebtoken');
const { Admin } = require('./../models');

module.exports = {
  async create(ctx) {
    const {
      email,
      phone,
      passport,
      firstName,
      lastName,
      password
    } = ctx.request.body;

    try {
      const user = await Admin.create({
        email,
        phone,
        passport,
        firstName,
        lastName,
        password
      });

      const payload = {
        userId: user.userId,
        email: user.email,
        phone: user.phone,
        passport: user.passport,
        firstName: user.firstName,
        lastName: user.lastName
      };

      const token = jwt.sign(payload, 'zzz');

      ctx.status = 201;
      ctx.body = { status: 'success', user: { ...payload, token } };
    } catch (error) {
      ctx.body = { status: 'fail', message: error };
    }
  },
  async findAdmin(email) {
    const user = await Admin.findOne({
      where: { email }
    });

    return user;
  },
  async updateData(userId, data) {
    try {
      const userRes = await Admin.update(data, {
        where: { userId },
        returning: true
      });

      return userRes[1][0].dataValues;
    } catch (error) {
      return error;
    }
  }
};
