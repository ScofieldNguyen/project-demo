const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@domain': path.resolve(__dirname, 'src/domain'),
    '@ui': path.resolve(__dirname, 'src/ui'),
  };
  return config;
};
