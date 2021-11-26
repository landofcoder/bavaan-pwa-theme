# FAQ module for Magento PWA Studio

This module acts as an add-on for [Venustheme's FAQ extension](https://landofcoder.com/faq-extension-for-magento2.html/) to make it work with Magento PWA Studio.

# faq-module-pwa-studio

Developing...
```
yarn add node-sass
yarn add sass-loader
```

modify packagejson
```
"dependencies": {
    ...
    "@landofcoder/faq": "link:./@landofcoder/faq-addon",
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
