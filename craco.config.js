/* craco.config.js */
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#F5912D",
              "@success-color": "#8fc742",
              "@info-color": "#645CA9",
              "@error-color": "#645CA9",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
