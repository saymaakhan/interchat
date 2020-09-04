const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
                '@primary-color': '#502be3',
                '@link-color': '#502be3'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};