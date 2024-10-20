import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    'prettier/prettier': ['error', { singleQuote: true }],
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
];
