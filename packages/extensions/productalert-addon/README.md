# Product Notification module for Magento PWA Studio

This module acts as an add-on for [Landofcoder's Product Notification extension](https://landofcoder.com/magento-2-free-gift-extension.html/) to make it work with Magento PWA Studio.

# productalert-module

Developing...
```
yarn add node-sass
yarn add sass-loader
```

modify packagejson
```
"dependencies": {
    ...
    "@landofcoder/productalert": "link:./@landofcoder/productalert-addon",
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
