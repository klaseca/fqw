const { Status } = require('./../models');

module.exports = {
  async getStatusTitle(statusId) {
    const { title } = await Status.findOne({ where: { statusId }, raw: true });

    return title;
  }
};
