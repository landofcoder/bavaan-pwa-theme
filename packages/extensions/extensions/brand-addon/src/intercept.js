const componentOverrideMapping = require('./componentOverrideMapping');
const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');

/**
 * Custom intercept file for the extension
 * By default you can only use target of @magento/pwa-buildpack.
 *
 * If do want extend @magento/peregrine or @magento/venia-ui
 * you should add them to peerDependencies to your package.json
 *
 * If you want to add overwrites for @magento/venia-ui components you can use
 * moduleOverrideWebpackPlugin and componentOverrideMapping
 */
module.exports = targets => {
    // Wrap the talon with this extension

  //   const peregrineTargets = targets.of('@magento/venia-ui');
  //   const talonsTarget = peregrineTargets.talons;

    // Set the buildpack features required by this extension
    const builtins = targets.of('@magento/pwa-buildpack');
    builtins.specialFeatures.tap(featuresByModule => {
      featuresByModule['@landofcoder/brand-addon'] = {
        cssModules: true,
        esModules: true
      };
    });


    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'All Brands',
            pattern: '/brands.html',
            path: require.resolve('./components/brandList/index.js')
        });
        routes.push({
            name: 'Brand Group',
            pattern: '/brandsGroup/:brandGroupUrl?',
            path: require.resolve('./components/brandGroup/index.js')
        });
        routes.push({
            name: 'Brand Info',
            pattern: '/brand/:brandUrl?',
            path: require.resolve('./components/brandInfo/index.js')
        })
      return routes;
    });

  //   talonsTarget.tap(talonWrapperConfig => {
  //     talonWrapperConfig.Homepage.useImageSlider.wrapWith(
  //       '@landofcoder/brand-addon'
  //     );
  //   });

    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
      new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    });
  };
