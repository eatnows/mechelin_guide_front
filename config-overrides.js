const rewireProvidePlugin = require("react-app-rewire-provide-plugin");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewireProvidePlugin(config, env, {
    "window.Quill": ["react-quill", "Quill"],
  });
  return config;
};
