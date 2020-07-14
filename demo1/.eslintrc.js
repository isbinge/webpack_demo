module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'max-len': ['warn', { tabWidth: 4, code: 100 }],
    'no-undef': 'error',
  },
  overrides: [
    {
      files: ['webpack.*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },
};
