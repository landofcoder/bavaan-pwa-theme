# category-elements-addon

This addon will provide common element components to display catalog categories:
- categories with icons and link horizontal/vertical
- categories with icons and link horizontal carousel
- category images banner slider

Developing...
```
yarn add node-sass
yarn add sass-loader
```

modify packagejson
```
"dependencies": {
    ...
    "@landofcoder/category-elements-addon": "link:./@landofcoder/category-elements-addon",
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
