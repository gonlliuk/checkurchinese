module.exports = {
    root: true,
    'extends': [
        'plugin:vue/essential',
        '@vue/airbnb'
    ],
    "rules": {
        "indent": ["warn", 4],
        "no-param-reassign": ["error", { "props": false }],
        "max-len": ["warn"]
    },
};
