# Store Locator module for Magento PWA Studio

This module acts as an add-on for [Landofcoder's Store Locator extension](https://landofcoder.com/magento-2-store-locator.html/) to make it work with Magento PWA Studio.

# landofcoder/storelocator-module

Developing...
```
yarn add node-sass
yarn add sass-loader
```

modify packagejson
```
"dependencies": {
    ...
    "@landofcoder/storelocator": "link:./@landofcoder/storelocator-addon",
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
