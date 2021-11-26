const moduleOverrideWebpackPlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping');
module.exports = targets => {
  targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
    /**
     *  Wee need to activated esModules and cssModules to allow build pack to load our extension
     * {@link https://magento.github.io/pwa-studio/pwa-buildpack/reference/configure-webpack/#special-flags}.
     */
    flags[targets.name] = { esModules: true, cssModules: true };
  });
  targets.of('@magento/venia-ui').routes.tap(
    routesArray => {
      routesArray.push({
        name: 'Store Credit',
        pattern: '/storecredit',
        path:'@landofcoder/storecredit-addon/src/components/StoreCreditPage/storeCreditPage.js'
      });
      return routesArray;
    });
  targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler=>{
    new moduleOverrideWebpackPlugin(componentOverrideMapping).apply(compiler);
  });
};
