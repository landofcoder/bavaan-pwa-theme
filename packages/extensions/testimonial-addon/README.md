# testimonial-addon

Developing...
```
yarn add node-sass
yarn add sass-loader
```

modify packagejson
```
"dependencies": {
    ...
    "@landofcoder/testimonial-addon": "link:./@landofcoder/testimonial-addon",
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
