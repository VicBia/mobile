module.exports = {
    root: true,
    extends: 'universe/native',
    plugins: ['simple-import-sort'],
    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'prettier/prettier': 'error',
        'import/order': 'off',
    },
}
