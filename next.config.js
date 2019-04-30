const path = require('path');

module.exports = {
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[folder]_[local]_[hash:base64:5]",
    },
    onDemandEntries: {
        websocketPort: 3003,
    },
    webpack: (config, {dev}) => {
        config.module.rules.push(
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: 'react-svg-loader'
            }
        );

        Object.assign(config.resolve.alias, {
            Api: path.resolve(__dirname, 'api'),
            Consts: path.resolve(__dirname, 'consts'),
            Components: path.resolve(__dirname, 'components'),
            Helpers: path.resolve(__dirname, 'helpers'),
            Hooks: path.resolve(__dirname, 'hooks'),
            Images: path.resolve(__dirname, 'static/images'),
            Prototypes: path.resolve(__dirname, 'prototypes'),
            Sass: path.resolve(__dirname, 'static/sass'),
            Static: path.resolve(__dirname, 'static'),
            Svg: path.resolve(__dirname, 'static/svg'),
        });

        return config;
    }

};
