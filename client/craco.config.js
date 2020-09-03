const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
                '@primary-color': '#e3652b',
                '@link-color': '#e3652b'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};