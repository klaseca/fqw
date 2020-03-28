const { resolve } = require('path');

module.exports = config => {
  config.resolve.alias = Object.assign(config.resolve.alias, {
    app: resolve(__dirname, 'src/'),
    com: resolve(__dirname, 'src/components/'),
    store: resolve(__dirname, 'src/store/')
  });
  return config;
};
