module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['airbnb', 'plugin:jest/recommended', 'jest-enzyme', 'plugin:prettier/recommended'],
    plugins: ['babel', 'import', 'jest', 'jsx-a11y', 'react', 'prettier'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'arrow-body-style': 'off', // Not our taste?
        'arrow-parens': 'off', // Incompatible with prettier
        'func-names': 'off',
        'function-paren-newline': 'off', // Incompatible with prettier
        'linebreak-style': 'off', // Don't play nicely with Windows.
        'max-len': ['error', 120, 4, { ignoreUrls: true }], // airbnb is allowing some edge cases
        'no-alert': 'error', // airbnb is using warn
        'no-console': 'warn', // airbnb is using warn
        'no-mixed-operators': 'off', // Incompatible with prettier
        'no-param-reassign': 'off', // Not our taste?
        'no-plusplus': 'off',
        'object-curly-newline': 'off', // Incompatible with prettier
        'prefer-destructuring': 'off',
        'radix': 'off', // parseInt, parseFloat radix turned off. Not my taste.
        'space-before-function-paren': 0, // Incompatible with prettier
        'react/forbid-prop-types': 'off', // airbnb use error
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
        'react/jsx-indent': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/no-array-index-key': 'warn',
        'react/no-find-dom-node': 'off', // I don't know
        'react/no-did-mount-set-state': 'off',
        'react/no-unused-prop-types': 'off', // Is still buggy
        'react/prop-types': 'off',
        'react/require-default-props': 'off', // airbnb use error
        'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'], specialLink: ['to'] }],
        'jsx-a11y/label-has-for': [
            2,
            {
                required: {
                    every: ['id'],
                },
            },
        ], // for nested label htmlFor error
    },
};
