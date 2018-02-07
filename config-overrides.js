const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#ff0000",
      "@layout-body-background": "#000000",
      "@layout-header-background": "#383838"
    },
  })(config, env);
  config = rewireCssModules(config, env);
  return config;
};
