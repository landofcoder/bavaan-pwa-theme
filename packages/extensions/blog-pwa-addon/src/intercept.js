// const componentOverrideMapping = require('./componentOverrideMapping');
// const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');

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
    featuresByModule['@landofcoder/ves-blog-module'] = {
      cssModules: true,
      esModules: true
    };
  });


  targets.of('@magento/venia-ui').routes.tap(routes => {
    routes.push({
      name: 'BlogHome',
      pattern: '/blog.html',
      path: require.resolve('./components/home/index.js')
    });
    routes.push({
      name: 'BlogCategory',
      pattern: '/blog/category/:categoryId?',
      path: require.resolve('./components/category/index.js')
    });
    routes.push({
      name: 'BlogTag',
      pattern: '/blog/tag/:alias?',
      path: require.resolve('./components/tag/index.js')
    });
    routes.push({
      name: 'BlogTopic',
      pattern: '/blog/topic/:topicUrl?',
      path: require.resolve('./components/topic/index.js')
    });
    routes.push({
      name: 'BlogArchive',
      pattern: '/blog/month/:monthUrl?',
      path: require.resolve('./components/month/index.js')
    });
    routes.push({
      name: 'BlogAuthor',
      pattern: '/blog/author/:authorId?',
      path: require.resolve('./components/author/index.js')
    });
    routes.push({
      name: 'BlogPost',
      pattern: '/blog/post/:postUrl?',
      path: require.resolve('./components/post/index.js')
    });
    routes.push({
      name: 'BlogsByDate',
      pattern: '/blog/date/:year?/:month?',
      path: require.resolve('./components/blogByDate/index.js')
    })
    return routes;
  });

//   talonsTarget.tap(talonWrapperConfig => {
//     talonWrapperConfig.Homepage.useImageSlider.wrapWith(
//       '@landofcoder/ves-blog-module'
//     );
//   });

//   targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
//     new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
//   });
};
