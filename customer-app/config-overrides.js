module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve = {
    ...config.resolve,
    modules: ['src', 'node_modules'],
  };
  return config;
};
