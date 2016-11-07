module.exports = {
    extends: 'airbnb',
    installedESLint: true,
    globals: {
        document: true,
        window: true,
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack.config.js',
            },
        },
    },
};
