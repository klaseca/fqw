const jwt = require('jsonwebtoken');
const { User } = require('./../models');

module.exports = {
  async create(ctx) {
    const { email, phone, firstName, lastName, password } = ctx.request.body;

    try {
      const user = await User.create({
        email,
        phone,
        firstName,
        lastName,
        password
      });

      const payload = {
        userId: user.userId,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName
      };

      const token = jwt.sign(payload, 'zzz');

      ctx.status = 201;
      ctx.body = { status: 'success', user: { ...payload, token } };
    } catch (error) {
      ctx.status = 409;
      let message = '';
      if (error.original.constraint === 'Users_phone_key') {
        message = 'Пользователь с таким телефоном уже существует';
      } else if (error.original.constraint === 'Users_email_key') {
        message = 'Пользователь с такой почтой уже существует';
      }
      ctx.body = { status: 'fail', message };
    }
  },
  async getUsers() {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    return users;
  },
  async findUser(email) {
    const user = await User.findOne({
      where: { email }
    });

    return user;
  },
  async updateData(userId, data) {
    try {
      const userRes = await User.update(data, {
        where: { userId },
        returning: true
      });

      return userRes[1][0].dataValues;
    } catch (error) {
      return error;
    }
  }
};
