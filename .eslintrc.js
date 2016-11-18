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
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    },
};
