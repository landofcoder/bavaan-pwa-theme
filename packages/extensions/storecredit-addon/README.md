# Store Credit module for Magento PWA Studio

This module acts as an add-on for [Landofcoder's Store Credit extension](https://landofcoder.com/magento-2-store-credit.html/) to make it work with Magento PWA Studio.

# landofcoder/storecredit-addon

Developing...
```
yarn add node-sass
yarn add sass-loader
```

modify packagejson
```
"dependencies": {
    ...
    "@landofcoder/storecredit-addon": "link:./@landofcoder/storecredit-addon",
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
