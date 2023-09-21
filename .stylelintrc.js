module.exports = {
  root: true,
  extends: ['stylelint-config-ibm-products'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'import-notation': 'string',
  },
};
