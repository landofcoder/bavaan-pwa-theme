# Product Label module for Magento PWA Studio

This module acts as an add-on for [Landofcoder's Product Label extension](https://landofcoder.com/magento-2-product-label.html/) to make it work with Magento PWA Studio.

# landofcoder/productlabel-module

Developing...
```
yarn add node-sass
yarn add sass-loader
```

modify packagejson
```
"dependencies": {
    ...
    "@landofcoder/productlabel": "link:./@landofcoder/landofcoder/productlabel-addon",
    ...
}
```

modify webpack.config.js
```
config.module.noParse = [/braintree\-web\-drop\-in/];
config.module.rules.push(
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    }
);
```
